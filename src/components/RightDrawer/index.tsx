import { Drawer } from 'antd';

import type { DrawerProps } from 'antd';
import { useControllableValue, useEventListener } from 'ahooks';

import styles from './index.less';

export type RightDrawerProps = {
  drawerProps?: DrawerProps;
  visible: DrawerProps['visible'];
  onVisibleChange: (visible: boolean) => void;
  title: React.ReactNode;
  footer?: React.ReactNode;
  panelSytle?: React.CSSProperties;
  width?: number | string;
};

const RightDrawer: React.FC<RightDrawerProps> = (props) => {
  const { drawerProps } = props;
  const { title, children, footer, panelSytle, width } = props;

  const [drawerVisible, setDrawerVisible] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
  });

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <Drawer
      className={styles.rightDrawer}
      title={title}
      placement="right"
      width={width || 480}
      closable={true}
      destroyOnClose={true}
      mask={true}
      visible={drawerVisible}
      onClose={onClose}
      footer={footer}
      {...drawerProps}
    >
      <div className={styles.panel} style={panelSytle}>
        {children}
      </div>
    </Drawer>
  );
};

export default RightDrawer;
