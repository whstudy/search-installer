import { Tag, Typography } from 'antd';
import styles from './index.less';
import IconFont from '../IconFont';

const StatisticTag: React.FC<any> = ({ closeEvent, title, closable = true }) => {
  return (
    <Tag
      className={`d-inline-flex align-items-center ${styles.characteristicTag}`}
      closable={closable}
      onClose={closeEvent}
      closeIcon={<IconFont type="icon-shanchu" />}
    >
      {title}
    </Tag>
  );
};

export default StatisticTag;
