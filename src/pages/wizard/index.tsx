import React, { useEffect, useState } from 'react';
import Search from './search'
import styles from './index.less';
import { Layout, Steps } from 'antd';
// import { Header, Sider } from 'antd/lib/layout/layout';
import WizardHeader from '@/components/WizardHeader';

const { Header, Sider, Content } = Layout;
const { Step } = Steps;

const Index: React.FC = () => {

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
          <WizardHeader />
        </Header>
        <Layout>
          <Sider theme={'light'} width={270} className={styles.siderContainer}>
            <div className={styles.siderTitle}>
              检索服务部署
            </div>

            <Steps
              direction="vertical"
              current={1}
              className={styles.steps}
            >
              <Step title={`添加节点`} />
              <Step title={`选择元数据盘`} />
              <Step title={`MagnaScle集群信息`} />
              <Step title={`部署检索服务`} />
            </Steps>
          </Sider>
          <Content className={styles.wizardContent}><Search /></Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Index;
