import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Layout, Steps } from 'antd';
import {apiDeployTerraSearchStepGet} from '@/services/dsm/Deploy';
import LnHeader from '@/components/Header';
import {useHistory, useLocation } from 'umi';

const { Header, Sider, Content } = Layout;
const { Step } = Steps;

const Index: React.FC = (props) => {
  const routesStep = [`/node`, `/disk`, `/cluster`, `/deploy`]
  const location = useLocation();
  const history = useHistory();
  const [stepInfo, setStepInfo] = useState<any>({})
  
  const getInitData = async () => {
    const res = await apiDeployTerraSearchStepGet({});
    setStepInfo(res.data)
    console.log(res)
    history.push(routesStep[res?.data?.current_step||0])
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
              current={routesStep.indexOf(location.pathname)}
              className={styles.steps}
            >
              {
                stepInfo?.all_step?.map(
                  (o) => <Step key={o} title={o}/>
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
