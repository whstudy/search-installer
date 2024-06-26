import {
  Button,
  Spin,
  Typography
} from 'antd';
import {history} from "umi";
import {  useState, useEffect } from 'react';
import styles from './index.less';
import {apiTerraSearchDeployProgressGet} from "@/services/dsm/Deploy";
import { FileTextOutlined } from '@ant-design/icons';
let timeId;
const { Paragraph } = Typography;
const Deploy = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>({})
  const getInitData = async () => {
    setIsLoading(true)
    const res: any = await apiTerraSearchDeployProgressGet({});
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
    history.push(`node`)
  }
  const statusMap = [ `deploying`, `success`, `failed` ]
  return (
    <Spin spinning={isLoading}>
      <div
        className={styles.deploy}
      >
        {(result.status&&statusMap.includes(result.status)) && <img src={require(`@/assets/${result.status}.svg`)}/>}
        {result.status === `doing` && <>
          <div className={styles.doing}>正在部署检索服务...</div>
        </>}
        {result.status === `failed` && <>
          <div className={styles.doing}>检索服务部署失败</div>
          <div className={styles.failedDesc}>失败原因：{result.failed_reason}</div>
          <Button onClick={reDeploy}>重新部署</Button>
        </>}
        {result.status === `success` && <>
          <div className={`${styles.doing} ${styles.success}`}>检索服务部署完成</div>
          <div>
            <div className={styles.successDesc}>
              <div className={styles.numText}>1</div>
              <div className={styles.descText}>
                <div>
                  下载检索集群证书
                  <div className={styles.crtDownload}>
                    <FileTextOutlined className={styles.icon} />
                    <div>
                      <div>
                        {result.certificate_file}
                      </div>
                      <div>
                        <a className={styles.linkBtn} target="_blank" href={result.certificate_file}>下载证书</a>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.successDesc}>
              <div className={styles.numText}>2</div>
              <div className={styles.descText}>
                需要在MagnaScale管理平台“设置”页面中的“系统管理”去开启对象检索服务，开启时需输入检索集群地址：
                <Paragraph copyable={{
                  icon: [<a className={`${styles.linkBtn} m-l-6`}>复制</a>, <a className={`${styles.linkBtn} ${styles.linkBtnDone} m-l-6`}>复制</a>]
                }}>{result.mgmt_uri}</Paragraph>
              </div>
            </div>
            <div className={styles.successDesc}>
              <div className={styles.numText}>3</div>
              <div className={styles.descText}>
                请
                <a href={result.app_uri} target="_blank" className={styles.link}>点击{result.app_uri}</a>
                进行对象检索
              </div>
            </div>
          </div>
        </>}
      </div>
    </Spin>
  );
};
export default Deploy;
