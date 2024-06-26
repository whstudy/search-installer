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
    -----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAubVGMMx4zvjr3yfchVYLvlrGrHk70yc8vv/XlCkbtP+fnPDC
    mqItouRuqFD1f51YmhnEsFFiK3BSlxCFoBOQktOS0LHHVBFvNxGpNPxEsyBdIunu
    9qZzeTl0hx5R544BaxEk4Ey37gS6IoNbEpHoLzN9haRHraw6MKKwdeqJ6qZfjM2L
    qREIfRcbOhFjlkxw6D4AgjhDqfWe5tRMtGNlSH6UXeWtjtkqsemxmlldh/cJc7YX
    wWOvr1plzmuPYwuuJGXJiGkDdS7xqXr+BocEinVIL2PQBLczp58kmuEKBKMoJecF
    XjLDywbWTFW7uwaVt2mlW6pWpg1uLVZKl9P86wIDAQABAoIBADe9kFbfWLePAYVW
    upsO67F0H8PvE6TaVyJhOnzPJfDa9TavEUpGuXn2JLzCqB1oxgpjB6WAl/2/1hpf
    rCwTE0bu2FdptRGntgEKfQZZXemCIlJzcvV3mptdQnu3/w+IkSZo2++zN1Xq90+a
    q8BUKSPZyahOWfFoC4NDocGS51iVmkDHaDLS0T5cdVZ7LjUdflwq6UrHyOuscwRs
    KZoWnt4TfE0uLBnqvMSjJlhqKGyOL4QKJgUGCXsNWphZxbNvK9NGgo0RnLomfpmF
    XY7CMk1Q2MmEa2+BcGQOj+I+fx6sbCS5chLZLFocoJGZ//+VYyXWNE+EqSXZVueg
    qXiiSlECgYEA6vBm9clt1xrF/HqTKMsfERqWUlwS60pCurHPuzDU95wCP8Fm158E
    f5TicQx0Wj685nfS/1TcNP+PywBbDacX7X8f2cNS0Gyf+GzzzWGj0FXb8tnMdfPW
    P660neFhNrO6rmlZXKA+W+2Me5+fe5dsZUagVAyCzXCGbRcAKJmGjSMCgYEAylsT
    D7VawXKWnoVkN/Pm9jzOA4aASp//HnJgfI7WMEpQ28r9FOXWiJUIQSVEkHduonDg
    AqLZaMqJmp0THzcD1aT+2x87rrxBCRZfCmGOTJz7o+9Flb/eIVvm3r3J/Ot7eNLa
    EURtDoG6m99KTc8syIiBqQBuwN0adP24Lfm5gZkCgYBenyIonc7SUqMo08lPJbfG
    cLnYQ+MOxqLnhFPQ5ZLwgvHY8bDU6OOr6q/krgpyilAUVnAxi+EAq2kjbmo9rm2R
    pqCSWPuSnB01tdPfhRKwBtSGE7goTWOd1GRELhC0MmDee+mUx6k15w+sfpaB9XOf
    unk6QKuxyD8r0paqw2KQlwKBgCb3WrhPp+ZQdoiYDzBnGzaXhuRO5i14mdv3EnVp
    2/z4kpGAiTOY/rLWX/yLfKSFGxzUt45KZas0NUM8tA3yvh5J43m2jfub7LofQLXz
    Cz/diueKj8/CXrf1xoNl8JtvjRs7HxrsHkQI3zJc0SYimvESuEUe/DTPXuTgZrMT
    v5EhAoGBAK4coXMzWrZLVurKcKU+CsNZYNf4F3x02flgoTi3OxOedGbmviZeDPqe
    kj4pr/5aH6Fr/bsJ9ge+q/GlJqGrlA63O/d4d4FkQNZU30TBiNqSga31MGMKpkcb
    ffzHi5exQfuI2nbob12KYvDJcd6/xF2sLTs2EY96J7MEqJXWaFMa
    -----END RSA PRIVATE KEY-----
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
                        <a className={styles.linkBtn} target="_blank" onClick={downLoadCert}>下载证书</a>  
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
