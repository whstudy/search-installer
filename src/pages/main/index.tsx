import React, { useEffect, useState } from 'react';
import Search from './search'
import styles from './index.less';
import { Layout, Steps } from 'antd';
import {appSetupTerraSearchStepGet} from '@/services/dsm/terraSearchDeploy';
import LnHeader from '@/components/Header';

const { Header, Sider, Content } = Layout;
const { Step } = Steps;

const Index: React.FC = (props) => {

  const [stepInfo, setStepInfo] = useState<any>({})
  
  const getInitData = async () => {
    const res = await appSetupTerraSearchStepGet({});
    setStepInfo(res.data)
    console.log(res)
  };
  
  useEffect(()=>{
    getInitData()
  }, [])
  
  return (
    <>
      {/*<Header className={styles.headerwrapper}>
        
      </Header>
      <Sider></Sider>
      <PageContainer pageHeaderRender={false} className={styles.wizardContent}>
        <Search />  
      </PageContainer>*/}

      <Layout className={styles.searchBody}>
        <Header className={styles.headerwrapper}>
          <LnHeader />
        </Header>
        <Layout>
          <Sider theme={'light'} width={270} className={styles.siderContainer}>
            <div className={styles.siderTitle}>
              检索服务部署
            </div>

            <Steps
              direction="vertical"
              current={stepInfo.current_step}
              className={styles.steps}
            >
              {
                stepInfo?.all_step?.map(
                  (o) => 
                    <>
                      <Step title={o}/>
                    </>
                )
              }
            </Steps>
          </Sider>
          <Content className={styles.wizardContent}>{props.children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Index;
