import { formatTime } from '@/utils';
import { LoadingOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Empty, List, Spin } from 'antd';
import classNames from 'classnames';
import { FormattedMessage, Link } from 'umi';

import styles from './index.less';
export type TaskListProps = {
  list: any;
  setVisbile: (visible: boolean) => void;
};

const TaskList: React.FC<TaskListProps> = (props) => {
  const { list = [], setVisbile } = props;
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<FormattedMessage id="component.task.empty" />}
        />
      );
    }
    const itemCls = classNames(styles.item);
    return (
      <List<API.queryjobstatus>
        className={styles.list}
        dataSource={list}
        renderItem={(item, i) => {
          const loadingIcon = (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          );
          return (
            <List.Item key={item.job_id} className={itemCls} extra={loadingIcon}>
              <List.Item.Meta
                className={styles.meta}
                title={
                  <div className={styles.title}>
                    <FormattedMessage id={`task.${item.job_name}`} />
                  </div>
                }
                description={
                  <div>
                    <div className={styles.datetime}>{formatTime(item.add_time)}</div>
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
    <Link onClick={() => setVisbile(false)} to="/alarm/tasks">
      <FormattedMessage id="component.task.all" /> <RightOutlined />
    </Link>
  );
  const title = (
    <strong>
      <FormattedMessage id="component.task.current" />
    </strong>
  );
  return (
    <Card size="small" title={title} extra={extra} style={{ width: 300 }}>
      {renderList()}
    </Card>
  );
};

export default TaskList;
