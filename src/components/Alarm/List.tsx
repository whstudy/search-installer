import { formatTime } from '@/utils';
import { RightOutlined } from '@ant-design/icons';
import { Card, Empty, List } from 'antd';
import classNames from 'classnames';
import { FormattedMessage, Link } from 'umi';
import AlarmMap from './AlarmMap';

import styles from './index.less';
export type AlarmListProps = {
  list: API.queryalert[];
  setVisbile: (visible: boolean) => void;
};

const AlarmList: React.FC<AlarmListProps> = (props) => {
  const { list = [], setVisbile } = props;
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<FormattedMessage id="component.alarm.empty" />}
        />
      );
    }
    const itemCls = classNames(styles.item);
    return (
      <List<API.queryalert>
        className={styles.list}
        dataSource={list}
        renderItem={(item, i) => {
          const leftIcon = (
            <span className={styles.iconElement}>{AlarmMap.severityIcon[item.severity]}</span>
          );
          return (
            <List.Item key={item.id} className={itemCls}>
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={<div className={styles.title}>{item.alert_title}</div>}
                description={
                  <div>
                    <div className={styles.datetime}>{formatTime(item.last_change)}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    );
  };
  const extra = (
    <Link onClick={() => setVisbile(false)} to="/alarm/current">
      <FormattedMessage id="component.alarm.all" /> <RightOutlined />
    </Link>
  );
  const title = (
    <strong>
      <FormattedMessage id="component.alarm.current" />
    </strong>
  );
  return (
    <Card size="small" title={title} extra={extra} style={{ width: 300 }}>
      {renderList()}
    </Card>
  );
};

export default AlarmList;
