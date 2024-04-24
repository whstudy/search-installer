import { dsmAlertCurrentGet } from '@/services/dsm/alert';
import { Badge } from 'antd';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import IconFont from '../IconFont';
import styles from './index.less';
import AlarmList from './List';

type AlarmIconProps = {
  className?: string;
};
const AlarmIcon: React.FC<AlarmIconProps> = (props) => {
  const { className } = props;
  const [visible, setVisible] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const cluster_id = currentCluster?.id || '';
  const [alarmsList, setAlarmsList] = useState<any>([]);
  const overlay = <AlarmList setVisbile={setVisible} list={alarmsList?.items} />;
  const trigger = (
    <span className={classNames(className, styles.noticeButton, { opened: visible })}>
      <Badge count={alarmsList?.total} style={{ boxShadow: 'none' }} className={styles.badge}>
        <IconFont type="icon-xiaoxi" style={{ fontSize: '22px' }} />
      </Badge>
    </span>
  );
  let isMounted = true;
  const fetch = useCallback(async () => {
    const res = await dsmAlertCurrentGet(
      { cluster_id, preindex: 1, sufindex: 5 },
      { ignoreNoAuth: true },
    );
    if (res?.success) {
      if (isMounted) {
        setAlarmsList(res.data);
      }
    }
  }, [cluster_id]);

  const timerId = useRef<any>();
  const timer = useCallback(() => {
    timerId.current = setTimeout(async () => {
      await fetch();
      timer();
    }, 5000999999);
  }, [fetch]);

  useEffect(() => {
    fetch();
    timer();
    return () => {
      isMounted = false;
      clearTimeout(timerId.current);
    };
  }, [fetch, timer]);

  return (
    <HeaderDropdown
      placement="bottomCenter"
      overlay={overlay}
      overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </HeaderDropdown>
  );
};

export default AlarmIcon;
