import { Drawer, Button, List, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import type { DrawerProps, ButtonProps } from 'antd';
import type { PageContainerProps } from '@ant-design/pro-layout';
import { useControllableValue, useEventListener } from 'ahooks';

import styles from './index.less';
import { FormattedMessage } from 'umi';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';

export type LocaleText = { text: string; locale: string };
type tabAction = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnProps?: ButtonProps;
} & LocaleText;
export type RightSiderProps = {
  drawerProps?: DrawerProps;
  pageContainerProps?: PageContainerProps;
  tabActiveKey?: PageContainerProps['tabActiveKey'];
  tabPanelList: React.ReactNodeArray;
  visible: DrawerProps['visible'];
  onVisibleChange: (visible: boolean) => void;
  onTabChange: (visible: string) => void;
  avatar?: React.ReactNode;
  title?: string;
  tabHeaders: LocaleText[];
  tabActions?: tabAction[];
  subTitle?: string;
};

const RightSider: React.FC<RightSiderProps> = (props: RightSiderProps) => {
  const { drawerProps, pageContainerProps, tabPanelList } = props;
  const { avatar, title, tabHeaders, tabActions, subTitle } = props;
  const [activeKey, setActiveKey] = useControllableValue<number>(props, {
    defaultValue: 0,
    valuePropName: 'tabActiveKey',
    trigger: 'onTabChange',
  });
  const [drawerVisible, setDrawerVisible] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
  });
  const bofyClassNameRef = useRef();

  const handleTabChange = (key: string) => {
    setActiveKey(parseInt(key, 10));
  };

  const onClose = () => {
    setDrawerVisible(false);
    setActiveKey(0);
  };

  const tabList = tabHeaders.map((item: any, index: number) => ({
    tab: <FormattedMessage id={item.locale} defaultMessage={item.text} />,
    key: `${index}`,
  }));

  const actions = tabActions && (
    <Space>
      {tabActions.map((n) => (
        <Button size="small" onClick={n.onClick} key={n.locale} {...n.btnProps}>
          <FormattedMessage id={n.locale} defaultMessage={n.text} />
        </Button>
      ))}
    </Space>
  );

  const description = subTitle || actions;

  const content = title ? (
    <List.Item>
      <List.Item.Meta avatar={avatar} title={title} description={description} />
      <div className={styles.closeDrawer} onClick={onClose}>
        <CloseOutlined />
      </div>
    </List.Item>
  ) : null;

  useEventListener('click', (e) => {
    setDrawerVisible(false);
  });

  const drawClassName = drawerProps?.className
    ? `${styles.rightSider} ${drawerProps?.className}`
    : styles.rightSider;
  if (drawerProps?.className) {
    delete drawerProps?.className;
  }

  useEffect(() => {
    if (drawerVisible) {
      bofyClassNameRef.current = document.body.className;
      document.body.className = `${document.body.className} ${styles.hideScrollStyle}`;
    } else {
      document.body.className = bofyClassNameRef.current ?? '';
    }
  }, [drawerVisible]);

  const thisDom = Array.from(document.getElementsByClassName('ant-drawer')).filter((v) =>
    v?.className?.includes('rightSider'),
  )?.[0];
  useEventListener(
    'mouseenter',
    (e) => {
      document.body.style.overflow = 'hidden';
    },
    { target: thisDom },
  );

  useEventListener(
    'mouseleave',
    (e) => {
      document.body.style.overflow = 'auto';
    },
    { target: thisDom },
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Drawer
        className={drawClassName}
        placement="right"
        width={600}
        closable={false}
        destroyOnClose={true}
        mask={false}
        maskStyle={{
          background: 'none',
        }}
        visible={drawerVisible}
        onClose={onClose}
        {...drawerProps}
      >
        <PageContainer
          className="detail-tab-content"
          fixedHeader
          header={{
            title: '',
            breadcrumb: {},
          }}
          content={content}
          tabList={tabList}
          tabActiveKey={activeKey?.toString()}
          onTabChange={handleTabChange}
          {...pageContainerProps}
        >
          {tabPanelList[activeKey]}
        </PageContainer>
      </Drawer>
    </div>
  );
};

export default RightSider;
