import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Tabs } from 'antd';

import Notify from './component/Notify';
import SNMP from './component/SNMP';
import styles from './index.less';
import { FormattedMessage, useLocation } from 'umi';
import { useEffect, useState } from 'react';

const { TabPane } = Tabs;
const AlarmForward: React.FC = () => {
  const rState: any = useLocation()?.state;
  const [activeKey, setActiveKey] = useState<string>('mail');

  useEffect(() => {
    if (rState) {
      if (rState?.type) {
        setActiveKey(rState.type as string);
      } else {
        setActiveKey('mail');
      }
    }
  }, [rState]);

  const tabNotify = (
    <div className="common-page-title">
      <FormattedMessage id="monitor.notify.emailNotify" />
    </div>
  );
  const tabSNMP = (
    <div className="common-page-title">
      <FormattedMessage id="monitor.notify.snmpNotify" />
    </div>
  );

  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard split="horizontal" className={`${styles.container} common-page`}>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          size="large"
          tabBarGutter={16}
          tabBarStyle={{ paddingLeft: 16 }}
        >
          <TabPane tab={tabNotify} key="mail">
            <Notify />
          </TabPane>
          <TabPane tab={tabSNMP} key="snmpv3">
            <SNMP />
          </TabPane>
        </Tabs>
      </ProCard>
    </PageContainer>
  );
};

export default AlarmForward;
