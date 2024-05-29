import {
  Button,
  Form,
  Input,
  Space,
  Spin,
  message,
  Typography
} from 'antd';
import {FormattedMessage, history} from "umi";
import React, {  useState, useEffect } from 'react';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import { ProFormUploadButton } from '@ant-design/pro-form';
import {
  appSetupApiGetTerraSearchDeployResultGet,
  appSetupApiGetMagnascaleClusterInfo,
} from "@/services/dsm/terraSearchDeploy";

const { Paragraph } = Typography;
const Four = (props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>({})
  const getInitData = async () => {
    setIsLoading(true)
    const res = await appSetupApiGetTerraSearchDeployResultGet({});
    setIsLoading(false)
    setResult(res.data)
  };

  useEffect(()=>{
    getInitData()
  }, [])

  const onFinish = async (values) => {

    const reader = new FileReader();
    reader.readAsText(values.certificate_filename?.[0].originFileObj);
    reader.onloadend = async (e: any) => {
      try {
        const res: any = await appSetupApiGetMagnascaleClusterInfo({ ...values, certificate_filename: values.certificate_filename?.[0]?.name, certificate_content: e?.target?.result  });
        if ((res as any).success) {
          message.success(res?.msg);
          return true;
        }
        message.error(res?.msg);
        return false;
      } catch (error) {
        return false;
      }
    }
    history.push('4')
  }

  const reDeploy = () => {
    history.push(`1`)
  }
  
  return (
    <Spin spinning={isLoading}>
      <div
        className={styles.four}
      >
        {result.status && <img src={require(`@/assets/${result.status}.svg`)}/>}
        {result.status === `doing` && <>
          <div className={styles.doing}>正在部署检索服务...</div>
        </>}
        {result.status === `failed` && <>
          <div className={styles.doing}>检索服务部署失败</div>
          <div className={styles.failedDesc}>失败原因：连接到部署节点超时</div>
          <Button onClick={reDeploy}>重新部署</Button>
        </>}
        {result.status === `succeed` && <>
          <div className={`${styles.doing} ${styles.succeed}`}>检索服务部署完成</div>
          <div>
            <div className={styles.succeedDesc}>
              <div className={styles.numText}>1</div>
              <div className={styles.descText}>
                需要在MagnaScale管理平台“设置”页面中的“系统管理”去开启对象检索服务，开启时需输入检索集群地址：
                <Paragraph copyable>10.128.10.10:9200</Paragraph>
              </div>
            </div>
            <div className={styles.succeedDesc}>
              <div className={styles.numText}>2</div>
              <div className={styles.descText}>
                请点击
                <a href={`https://10.128.128.99:808`} target="_blank" className={styles.link}>https://10.128.128.99:808</a>
                进行对象检索
              </div>
            </div>
          </div>
        </>}
      </div>
    </Spin>
  );
};
export default Four;
