import React, { useState } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useIntl, useModel, Access, useAccess } from 'umi';
import DoubleConfirm from '@/components/DoubleConfirm';
import styles from './index.less';
import { dsmClustersPowerDown } from '@/services/dsm/cluster';
import useLogOut from '../Hooks/useLogOut';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const ClusterShutDown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id || '';
  const cluster_name = initialState?.currentCluster?.name || '';
  const access = useAccess();
  const [modalVisible, setModalVisible] = useState(false);
  const intl = useIntl();
  const { logout } = useLogOut();
  // 集群关机
  const handleDelete = async () => {
    setModalVisible(true);
    const hideMsg = message.loading({
      content: intl.formatMessage({
        id: 'component.shutDown.msg',
        defaultMessage: '正在关机',
      }),
      className: styles.shutDownMsgStyle,
      duration: 0,
    });
    const res = await dsmClustersPowerDown({ cluster_id });
    hideMsg();
    if ((res as any).success) {
      logout();
    } else {
      setModalVisible(false);
      res?.message?.error(res.msg);
    }
    Promise.resolve();
  };
  return (
    <>
      <Access accessible={access.admin}>
        <DoubleConfirm
          callback={() => handleDelete()}
          content={
            <p>
              {intl.formatMessage(
                {
                  id: 'component.shutDown.confirm.content',
                  defaultMessage: `关闭集群会停止该集群上所有的数据盘服务，可能会触发数据重构，确定关闭集群${cluster_name}吗？`,
                },
                { clusterName: cluster_name },
              )}
            </p>
          }
        >
          <PoweroffOutlined className={styles.action} style={{ fontSize: '16px' }} />
        </DoubleConfirm>
      </Access>
      {modalVisible && <div className={styles.shutDownBg}></div>}
    </>
  );
};

export default ClusterShutDown;
