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
  appSetupApiGetMagnascaleClusterInfo, appSetupApiMagnascaleClusterInfoGet,
} from "@/services/dsm/terraSearchDeploy";
let timeId;
const { Paragraph } = Typography;
const Four = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>({})
  const [clusterInfo, setClusterInfo] = useState<any>({})
  const getInitData = async () => {
    setIsLoading(true)
    const res: any = await appSetupApiGetTerraSearchDeployResultGet({});
    const clusterInfoRes = await appSetupApiMagnascaleClusterInfoGet({});
    setClusterInfo(clusterInfoRes.data)
    setIsLoading(false)
    setResult(res.data)
  };

  useEffect(()=>{
    getInitData()
  }, [])

  useEffect(()=>{
    if(result.status === `doing`){
      timeId = setInterval(()=>getInitData(), 3000)
    }else{
      clearInterval(timeId)
    }
  }, [result.status])
  
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
          <div className={styles.failedDesc}>失败原因：{result.failed_reason}</div>
          <Button onClick={reDeploy}>重新部署</Button>
        </>}
        {result.status === `succeed` && <>
          <div className={`${styles.doing} ${styles.succeed}`}>检索服务部署完成</div>
          <div>
            <div className={styles.succeedDesc}>
              <div className={styles.numText}>1</div>
              <div className={styles.descText}>
                需要在MagnaScale管理平台“设置”页面中的“系统管理”去开启对象检索服务，开启时需输入检索集群地址：
                <Paragraph copyable>{clusterInfo.domain_name}</Paragraph>
              </div>
            </div>
            <div className={styles.succeedDesc}>
              <div className={styles.numText}>2</div>
              <div className={styles.descText}>
                请点击
                <a href={result.terra_search_app_address} target="_blank" className={styles.link}>{result.terra_search_app_address}</a>
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
