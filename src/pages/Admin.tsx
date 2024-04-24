import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl, useModel } from 'umi';

export default (): React.ReactNode => {
  const intl = useIntl();
  const clusters = useModel('cluster');

  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This page can only be viewed by admin',
      })}
    >
      <Card>{JSON.stringify(clusters)}</Card>
    </PageHeaderWrapper>
  );
};
