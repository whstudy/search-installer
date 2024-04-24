import React, { useCallback, useRef, useState } from 'react';
import {
  CaretDownOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Menu, Spin} from 'antd';
import { FormattedMessage, history, useIntl, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {
  portalLoginConfigGetConfigureGet,
} from '@/services/dsm/login';
import type { MenuInfo } from 'rc-menu/lib/interface';
import useLogOut from '../Hooks/useLogOut';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const formRef = useRef<any>();
  const intl = useIntl();
  const { logout } = useLogOut();

  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        logout();
        return;
      } else if (key === 'settings') {
        setModalVisible(true);
        setSpinning(true);
        const res = await portalLoginConfigGetConfigureGet();
        if (res.success) {
          const { LOGIN_LOCK_COUNT, LOGIN_LOCK_TIME, LOGIN_OBSERVATION_TIME } = res.data!;
          formRef.current?.setFieldsValue({
            LOGIN_LOCK_COUNT,
            LOGIN_LOCK_TIME,
            LOGIN_OBSERVATION_TIME,
          });
          setSpinning(false);
        } else {
          res.message?.error(res.msg);
        }
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems = [
    {
      key: "logout",
      label: <>
        <LogoutOutlined />
        <FormattedMessage id="pages.logout" />
      </>
    }
  ]
  
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems}>
    </Menu>
  );

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
          <CaretDownOutlined className={styles.downArrow} />
        </span>
      </HeaderDropdown>
    </>
  );
};

export default AvatarDropdown;
