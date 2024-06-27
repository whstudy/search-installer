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
import { saveAs } from 'file-saver';
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
    if(result.status === `deploying`){
      timeId = setInterval(()=>getInitData(), 3000)
    }else{
      clearInterval(timeId)
    }
  }, [result.status])
  
  const reDeploy = () => {
    history.push(`node`)
  }
  const statusMap = [ `deploying`, `success`, `failed` ]

  const downLoadCert = () => {
    const blob = new Blob([`-----BEGIN CERTIFICATE-----
    MIIDRDCCAiygAwIBAgIULD5kcoHON4sTfb+RW6O8D3qRgVYwDQYJKoZIhvcNAQEL
    BQAwSzELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB2JlaWppbmcxEDAOBgNVBAcMB2Jl
    aWppbmcxCzAJBgNVBAoMAmxuMQswCQYDVQQLDAJsbjAgFw0yNDA0MjIwNjQ5MjJa
    GA8yMTI0MDMyOTA2NDkyMlowSzELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB2JlaWpp
    bmcxEDAOBgNVBAcMB2JlaWppbmcxCzAJBgNVBAoMAmxuMQswCQYDVQQLDAJsbjCC
    ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALm1RjDMeM74698n3IVWC75a
    xqx5O9MnPL7/15QpG7T/n5zwwpqiLaLkbqhQ9X+dWJoZxLBRYitwUpcQhaATkJLT
    ktCxx1QRbzcRqTT8RLMgXSLp7vamc3k5dIceUeeOAWsRJOBMt+4EuiKDWxKR6C8z
    fYWkR62sOjCisHXqieqmX4zNi6kRCH0XGzoRY5ZMcOg+AII4Q6n1nubUTLRjZUh+
    lF3lrY7ZKrHpsZpZXYf3CXO2F8Fjr69aZc5rj2MLriRlyYhpA3Uu8al6/gaHBIp1
    SC9j0AS3M6efJJrhCgSjKCXnBV4yw8sG1kxVu7sGlbdppVuqVqYNbi1WSpfT/OsC
    AwEAAaMeMBwwGgYDVR0RBBMwEYIPbWFnbmFzY2FsZS5vYmoxMA0GCSqGSIb3DQEB
    CwUAA4IBAQAbKKN0jLTzE2JYVRnyHb79yFuGYamzM37wwUmOjqZv6JbNwaCE3o9M
    9ue3zLGk+oWX9jgeAvPnlrXvFtYxRS1K24xri6qiL4XSSrB7DvWB2FpJE/lMJcPR
    akjCBVBqtozmcIVxr5tua5iZiw+RN8R/0UCTk6D+pbbr0X9w79jUHetcBN13j8Ns
    uLuAF71K14UUV5Mov16T1fm2B17Bv6vljy1blBw9Y5y10kdIx9jgTYGY2/nf5zVl
    XfLY3Ru7HxzFyq1F+qcPWfC+VQHXzPKCRBlBN6t/n1OtOYZsYDuBoW4xAN+uZeV4
    sfdJpyJbIgzyalOvwdrIEd1CAZGqtNRy
    -----END CERTIFICATE-----
    `]);
    saveAs(blob, `abc.txt`);  
  }
  
  return (
    <Spin spinning={isLoading}>
      <div
        className={styles.deploy}
      >
        {(result.status&&statusMap.includes(result.status)) && <img src={require(`@/assets/${result.status}.svg`)}/>}
        {result.status === `deploying` && <>
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
                        {result.certificate_filename}
                      </div>
                      <div>
                        {/*<a className={styles.linkBtn} target="_blank" onClick={downLoadCert}>下载证书</a>  */}
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
