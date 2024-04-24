import { useModel, SelectLang, history, Access } from 'umi';
import React from 'react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Space, message, Modal, Button, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Avatar from './AvatarDropdown';
import Cluster from './ClusterDropdown';
import HeaderSearch from '../../pages/GlobalSearch/components/HeaderSearch';
import styles from './index.less';
import { isNotEmpty } from '@/utils';
import Alarm from '../Alarm';
import Task from '../Task';
import ClusterShutDown from './ClusterShutDown';
import IconFont from '../IconFont';
import ShowPairMessage from './ShowPairMessage';

export type SiderTheme = 'light' | 'dark';
const JobSyncInterval = 10 * 1000;

const Help: React.FC = () => {
  return (
    <span
      className={styles.action}
      onClick={() => {
        window.open('/help/Lenovo MagnaScale Manager 用户指南.pdf');
      }}
    >
      <IconFont type="icon-bangzhu" style={{ fontSize: '22px' }} />
    </span>
  );
};

const Setting: React.FC = () => {
  return (
    <span className={styles.action}>
      <SettingOutlined />
    </span>
  );
};

// 这里组件渲染了约超过30次，原因未知
const GlobalHeaderRight: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster, globalConfig } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const { globalJobQueue, fetchJobsByIds, FinishedJobStatus, showMsgBox, deleteJobByIds } =
    useModel('job');

  useEffect(() => {
    let timerId;

    const fetch = async (cluster: string, jobs: string) => {
      const items = await fetchJobsByIds(cluster, jobs);
      _.forEach(items, (item: API.queryjobstatus) => {
        if (FinishedJobStatus.includes(item?.job_status)) {
          // 依赖一个在内部会被改变状态的变量，注意其更改条件哦，否则有循环的危险
          deleteJobByIds([item?.id as number]);
          showMsgBox(message, _.lowerCase(item?.job_status), item, intl);
        }
      });
    };

    const timer = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      timerId = setInterval(() => {
        if (isNotEmpty(globalJobQueue) && globalJobQueue.length > 0) {
          fetch(clusterId as string, globalJobQueue.join(','));
        }
      }, JobSyncInterval);
    };

    if (globalJobQueue.length > 0) {
      timer();
    } else {
      clearInterval(timerId);
    }

    return () => {
      timerId && clearInterval(timerId);
    };
  }, [
    clusterId,
    globalJobQueue,
    FinishedJobStatus,
    showMsgBox,
    fetchJobsByIds,
    deleteJobByIds,
    intl,
  ]);

  useEffect(() => {
    const licenseInfo = initialState?.currentUser?.licenseCluster;
    const licenseNodes = initialState?.currentUser?.licenseNodes;
    const openwizard = initialState?.globalConfig?.stateOpenwizard;
    const statePwdChanged = initialState?.globalConfig?.statePwdChanged;

    if (localStorage.getItem('deployRedirect')) {
      history.replace('/user/login');
    }
    if (!statePwdChanged) {
      // 是否为初次登录，修改默认密码
      history.replace('/initpwd');
    } else if (openwizard) {
      // 增加向导配置跳转逻辑
      history.replace('/wizard');
    } else {
      /** 授权 */
      const days = licenseInfo?.days_remaining || 1; // 获取集群过期时间
      // 集群过期时拦截更改路由跳转
      if (days <= 0 && history.location.pathname !== '/expired') {
        history.replace('/expired');
      }

      // 集群和节点即将过期时 仅跳转提示一次
      const showTag = localStorage.getItem('visitTime'); // 解决每次刷新页面时都会有集群即将过期提醒
      if (
        (JSON.stringify(licenseInfo) !== '{}' && days > 0) ||
        JSON.stringify(licenseNodes) !== '[]'
      ) {
        Modal.destroyAll(); // 手动更改浏览器地址时关闭弹框
        if (showTag === '0') {
          localStorage.setItem('visitTime', '1');
          history.replace('/expired');
        }
      }
    }
  }, [history.location.pathname]);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
