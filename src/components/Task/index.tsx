import { dsmJobStatusGet } from '@/services/dsm/job';
import { Badge } from 'antd';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import IconFont from '../IconFont';
import styles from './index.less';
import List from './List';

type AlarmIconProps = {
  className?: string;
};
const AlarmIcon: React.FC<AlarmIconProps> = (props) => {
  const { className } = props;
  const [visible, setVisible] = useState(false);
  const countRef = useRef<number[]>(); // 上一次的job集合
  const [statusList, setStatusList] = useState<API.queryjobstatus[]>([]);
  const [list, setList] = useState<API.queryjobstatus[]>([]);
  const { initialState } = useModel('@@initialState');
  const { globalJobQueue } = useModel('job');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';

  const overlay = <List setVisbile={setVisible} list={list} />;
  const trigger = (
    <span className={classNames(className, styles.noticeButton, { opened: visible })}>
      <Badge count={list.length} style={{ boxShadow: 'none' }} className={styles.badge}>
        <IconFont type="icon-renwuliebiao" style={{ fontSize: '22px' }} />
      </Badge>
    </span>
  );

  useEffect(() => {
    const fetch = async () => {
      // 可能存在无效id导致globalJobQueue与data结果不一致， 比如登出未清除，切换proxy未手动清除等
      const latest = globalJobQueue.reverse().slice(0, 5);
      const res = await dsmJobStatusGet({
        cluster_id: clusterId,
        job_ids: latest.join(','),
      });
      const { success, data } = res;
      if (success && data) {
        // 进行态无谓个数变化，而是job_id集合内容的变化，前后都是2个id，可能完全不同
        const currentJobIds: number[] = data?.map((v) => v?.job_id);
        const lastJobIds: any = countRef.current;
        let isDiff = false;
        if (lastJobIds) {
          isDiff = !!Array.from(new Set(currentJobIds?.concat(lastJobIds)))?.filter(
            (v) =>
              (lastJobIds?.includes(v) && !currentJobIds?.includes(v)) ||
              (!lastJobIds?.includes(v) && currentJobIds?.includes(v)),
          )?.length;
        }
        if ((!lastJobIds?.length && currentJobIds?.length) || isDiff) {
          setVisible(true);
        }
        countRef.current = currentJobIds;
        setStatusList(data);
      }
    };
    if (globalJobQueue.length > 0) {
      fetch();
    }
  }, [clusterId, globalJobQueue]);

  useEffect(() => {
    if (globalJobQueue.length > 0) {
      setList(statusList);
    } else {
      setList([]);
      setVisible(false);
    }
  }, [statusList, globalJobQueue]);

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
