import { FormattedMessage } from 'umi';
import { Button, Empty, Space } from 'antd';
import styles from './index.less';

export default (props) => {
  const { loading, onCollect } = props;

  return (
    <Space direction="vertical" size="middle" className={styles.empty}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <>
            <div className={'second-detail-text'}>
              <FormattedMessage
                id="monitor.clusterConfig.noFile"
                defaultMessage="暂无配置信息文件"
              />
            </div>
            <div className={'tertiary-detail-text'}>
              <FormattedMessage
                id="monitor.clusterConfig.tips.firstCollect"
                defaultMessage="点击下方按钮收集配置信息"
              />
            </div>
          </>
        }
      />
      <div className={styles.box}>
        <Button type="primary" ghost disabled={loading} onClick={onCollect}>
          <FormattedMessage id="monitor.clusterConfig.collect" defaultMessage="收集" />
        </Button>
      </div>
    </Space>
  );
};
