import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Icon from '@ant-design/icons';
import { Card, Button, Divider } from 'antd';
import { useAccess, Access, useModel } from 'umi';
import { ReactComponent as DemoIcon } from '@/assets/svg/data-circle.svg';
import logo from '@/assets/icons/icon-128x128.png';
import IconFont from '@/components/IconFont';
import RightSider from '@/components/RightSider';
import RightDrawer from '@/components/RightDrawer';

import DoubleConfirm from '@/components/DoubleConfirm';
import useAsyncCallback from './common/useAsyncCallback';
import PathSelect from '@/components/PathSelect';

const DemoWrapper = () => <DemoIcon width={50} height={50} />;

export default (): React.ReactNode => {
  const { clusters, fetchClusters } = useModel('cluster');
  const access = useAccess();

  const ClustersList = useMemo(
    () =>
      clusters?.map((c: any) => {
        return (
          <li key={c.id}>
            {c.name}: {c.status}
          </li>
        );
      }),
    [clusters],
  );

  useEffect(() => {
    const fetch = async () => {
      await fetchClusters();
    };
    fetch();
  }, [fetchClusters]);

  const onClose = () => {};

  const [visible, setVisible] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [tabKey, setTabKey] = useState('0');
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  // path
  const [path, setPath] = useState('/');
  const [cpath, setCpath] = useState('/');

  // const { start, polling } = useAsyncCallback((success, job) => {
  //   console.log('call refresh', success, job);
  // });

  const { start, polling, success, done } = useAsyncCallback();
  useEffect(() => {
    if (done) {
      console.log('call refresh', done);
    }
  }, [done]);

  return (
    <PageContainer>
      <Card>
        <Icon component={DemoWrapper} />
        <img src={logo} style={{ display: 'none' }} />
        {ClustersList}
        <IconFont type="icon-menu-storage" />
        <IconFont type="iconfileshare" />
      </Card>

      <p>visible: {JSON.stringify(visible)}</p>
      <Button onClick={(e) => setVisible(false)}>close Drawer</Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setVisible(true);
        }}
      >
        open Drawer
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setTabKey('1');
        }}
      >
        active tab
      </Button>
      <RightSider
        title={'title'}
        tabActiveKey={tabKey}
        onTabChange={setTabKey}
        avatar={<IconFont type="icon-menu-storage" />}
        tabHeaders={[
          {
            text: '预览',
            locale: 'storage.pool.preview',
          },
          {
            text: '容量',
            locale: 'storage.pool.capacity',
          },
          {
            text: '性能',
            locale: 'storage.pool.performance',
          },
        ]}
        tabPanelList={[<h2>1</h2>, <h2>2</h2>, <h3>3</h3>]}
        visible={visible}
        subTitle="2021-11-26 17:02:43"
        tabActions={[
          {
            text: '删除',
            locale: 'component.button.edit',
            btnProps: {
              disabled: true,
            },
            onClick: (e) => {
              console.log(e.target);
            },
          },
          {
            text: '删除',
            locale: 'component.button.delete',
            onClick: (e) => {
              console.log(e.target);
            },
          },
        ]}
        onVisibleChange={(s: boolean) => setVisible(s)}
      />

      <Divider />
      <Button onClick={() => setVisibleDrawer(false)}>close RightDrawer</Button>
      <Button onClick={() => setVisibleDrawer(true)}>open RightDrawer</Button>
      <RightDrawer
        title={'title'}
        visible={visibleDrawer}
        onVisibleChange={(s: boolean) => setVisibleDrawer(s)}
        footer={'footer'}
      >
        <h4>RightDrawer</h4>
      </RightDrawer>

      <Divider />
      {/* <Access accessible={access.denied}>
        <Button>Denied</Button>
      </Access> */}
      {/* const access = useAccess(); */}

      <Access accessible={access.admin}>
        <Button>Admin permission</Button>
      </Access>
      <Access accessible={access.super}>
        <Button>Super Admin permission</Button>
      </Access>

      <Divider />
      <DoubleConfirm
        callback={async () => {
          console.log('confirm');
        }}
        content={<p> content </p>}
      >
        <Button>Double Confirm</Button>
      </DoubleConfirm>

      <DoubleConfirm
        callback={async () => {
          console.log('confirm');
        }}
        content={<p> content </p>}
        visible={visibleConfirm}
        onVisibleChange={setVisibleConfirm}
      />

      <Button
        onClick={() => {
          setVisibleConfirm(true);
        }}
      >
        setVisibleConfirm
      </Button>

      <Divider />
      <p>success: {success.toString()}</p>
      <p>done: {done.toString()}</p>
      <button onClick={() => start(128)}>{polling ? 'polling' : 'start'}</button>

      <Divider />
      <p>{path}</p>
      <PathSelect value={path} onChange={(s) => setPath(s)} />
      <p>{cpath}</p>
      <PathSelect value={cpath} onChange={(s) => setCpath(s)} combobox />
    </PageContainer>
  );
};
