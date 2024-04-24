import { FormattedMessage } from 'umi';
import { formatTime } from '@/utils';
import { Button, Space } from 'antd';
import IconFont from './IconFont';
import styles from './index.less';

type CollectionProps = {
  data: {
    last_collection_time: string;
  };
  loading: boolean;
  onDownload: () => void;
  onCollect: () => void;
};

const Collection: React.FC<CollectionProps> = (props) => {
  const { data, loading, onDownload, onCollect } = props;

  return (
    <Space size="middle" className={styles.collection}>
      <div>
        <IconFont type="icon-jiqunpeizhixinxi" className={styles.icon} />
      </div>
      <div>
        <div>
          <FormattedMessage id="monitor.clusterConfig.info" defaultMessage="集群配置信息" />
        </div>
        <div className={styles.comment}>
          <FormattedMessage
            id="monitor.clusterConfig.collectAt"
            values={{ collectTime: formatTime(data?.last_collection_time) }}
          />
        </div>
      </div>
      <div className={styles.btns}>
        <Button type="primary" disabled={loading} onClick={onDownload}>
          <FormattedMessage id="monitor.clusterConfig.download" defaultMessage="下载" />
        </Button>
        <Button type="primary" ghost disabled={loading} onClick={onCollect}>
          <FormattedMessage id="monitor.clusterConfig.reCollect" defaultMessage="重新收集" />
        </Button>
      </div>
    </Space>
  );
};

export default Collection;
