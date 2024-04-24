import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { Access, FormattedMessage, useAccess, useIntl, useModel, history, getLocale } from 'umi';
import { Base64 } from 'js-base64';
import {
  CaretDownOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Modal, Space, Typography } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import { utilsReg } from '@/utils';
import {
  dsmClustersClusterTakeover,
  dsmClustersDeleteCluster,
  dsmClustersUpdateCluster,
} from '@/services/dsm/cluster';
import { dsmLicenseInfoGet } from '@/services/dsm/License';
import _ from 'lodash';

import styles from './index.less';

const { confirm } = Modal;
const inlineStyle = {
  font: {
    fontSize: '16px',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
};

const ClusterDropdown: React.FC = () => {
  const access = useAccess();
  const { initialState, refresh, setInitialState } = useModel('@@initialState');
  const { clusters = [], currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [editingCluster, setEditingCluster] = useState<API.querycluster>();
  const [licenseState, setLicenseState] = useState(-1);
  const lang = getLocale();
  const formRef = useRef<any>();
  const formAddRef = useRef<any>();

  const intl = useIntl();

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      const res = await dsmLicenseInfoGet({ cluster_id: clusterId });
      if (res?.success && res?.data) {
        const { license_state = -1 } = res.data;
        if (isMounted) {
          setLicenseState(license_state);
        }
      }
    };
    fetch();
    return () => {
      isMounted = false;
    };
  }, [clusterId]);

  const handleMenuClick = useCallback(
    (cluster) => {
      // const cluster = clusters.find((c) => c.id === event.key);
      const { pathname } = history.location;

      if (!cluster?.is_local) {
        // localStorage.setItem('cluster', JSON.stringify(cluster));
        // window.location.reload();
        const type = `${cluster.takeover_user}&&${Base64.decode(cluster.takeover_pass)}`;

        window.location.href = `http://${
          cluster.ip
        }/#/user/login?redirect=${pathname}&source=cluster&type=${Base64.encode(type)}&e=${lang}`;
      }
    },
    [clusters, initialState, setInitialState],
  );

  const handleRemove = useCallback(
    (e, cluster) => {
      // e.stopPropagation();
      setModalDeleteVisible(true);
      if (formRef) {
        setEditingCluster(cluster);
      }
    },
    [clusters, intl, refresh],
  );
  const handleEdit = useCallback((e, cluster) => {
    // e.stopPropagation();
    setModalEditVisible(true);
    if (formRef) {
      formRef.current?.setFieldsValue({ id: cluster?.id, name: cluster?.name });
      setEditingCluster(cluster);
    }
  }, []);

  const submenu = useCallback(
    (cluster) => {
      return (
        <Access accessible={access.super}>
          <Menu>
            {cluster.is_local ? (
              <Menu.Item key="rename">
                <Button
                  style={{ paddingLeft: 0 }}
                  type="link"
                  size="small"
                  onClick={(e) => handleEdit(e, cluster)}
                >
                  <FormattedMessage id="component.cluster.cluster_edit" defaultMessage="更改" />
                </Button>
              </Menu.Item>
            ) : (
              <Menu.Item key="delete">
                <Button
                  style={{ paddingLeft: 0 }}
                  type="link"
                  size="small"
                  onClick={(e) => handleRemove(e, cluster)}
                >
                  <FormattedMessage id="component.button.delete" defaultMessage="删除" />
                </Button>
              </Menu.Item>
            )}
          </Menu>
        </Access>
      );
    },
    [handleEdit, handleRemove],
  );

  const menu = useMemo(
    () => (
      <Menu className={styles.clusterDropBtnStyle} selectedKeys={[clusterId || '']}>
        {clusters.map((cluster) => (
          <Menu.Item key={cluster.id} style={inlineStyle.font}>
            <Dropdown.Button
              icon={<MoreOutlined />}
              trigger={['hover']}
              overlay={submenu(cluster)}
              onClick={() => handleMenuClick(cluster)}
            >
              {cluster.name} ({cluster.ip})
            </Dropdown.Button>
          </Menu.Item>
        ))}
        {[0, 1].includes(licenseState) ? (
          <Access accessible={access.super}>
            <Menu.Item key="add">
              <Button
                style={{ paddingLeft: 0 }}
                icon={<PlusOutlined />}
                type="link"
                size="small"
                onClick={() => {
                  formAddRef.current?.resetFields();
                  setModalVisible(true);
                }}
              >
                <span style={{ marginLeft: '5px' }}>
                  <FormattedMessage id="component.cluster.cluster_add" defaultMessage="纳管集群" />
                </span>
              </Button>
            </Menu.Item>
          </Access>
        ) : null}
      </Menu>
    ),
    [access.super, clusterId, clusters, handleMenuClick, licenseState, submenu],
  );

  const renderAdd = () => {
    return (
      <ModalForm
        title={intl.formatMessage({ id: 'component.cluster.cluster_add' })}
        width={400}
        formRef={formAddRef}
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        modalProps={{
          centered: true,
        }}
        onFinish={async (values) => {
          const res = await dsmClustersClusterTakeover({
            cluster_id: clusterId || '',
            takeover_user: values.user,
            takeover_ip: values.ip,
            takeover_pass: Base64.encode(values.pass),
          });
          if (res.success) {
            res.message?.success(res.msg);
          } else {
            res.message?.error(res.msg);
          }
          refresh();
          return true;
        }}
      >
        <ProFormText
          name="ip"
          label={intl.formatMessage({ id: 'component.cluster.cluster_ip' })}
          fieldProps={{
            maxLength: 30,
          }}
          rules={[
            {
              required: true,
            },
            {
              pattern: utilsReg.ipReg,
              message: `${intl.formatMessage({
                id: 'component.cluster.cluster_ip.pattern',
              })}`,
            },
          ]}
        />
        <ProFormText
          name="user"
          label={intl.formatMessage({
            id: 'component.cluster.username',
          })}
          fieldProps={{
            maxLength: 128,
          }}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'component.input.tip',
                defaultMessage: '请输入',
              })}${intl.formatMessage({
                id: 'component.cluster.username',
              })}`,
            },
          ]}
        />
        <ProFormText.Password
          name="pass"
          label={intl.formatMessage({
            id: 'component.cluster.pwd',
          })}
          fieldProps={{
            maxLength: 30,
          }}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'component.input.tip',
                defaultMessage: '请输入',
              })}${intl.formatMessage({
                id: 'component.cluster.pwd',
              })}`,
            },
          ]}
        />
      </ModalForm>
    );
  };

  const renderEdit = () => {
    return (
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({ id: 'component.cluster.cluster_edit' })}
        width={400}
        visible={modalEditVisible}
        onVisibleChange={setModalEditVisible}
        modalProps={{
          centered: true,
        }}
        onFinish={async (values) => {
          const res = await dsmClustersUpdateCluster({
            cluster_id: editingCluster?.id || '',
            new_name: values.name,
          });
          if (res.success) {
            res.message?.success(res.msg);
          } else {
            res.message?.error(res.msg);
          }
          refresh();
          return true;
        }}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'component.cluster.cluster_name',
          })}
          fieldProps={{
            maxLength: 128,
          }}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'component.input.tip',
                defaultMessage: '请输入',
              })}${intl.formatMessage({
                id: 'component.cluster.cluster_name',
              })}`,
            },
            {
              pattern: /^(?![-_])[a-zA-Z0-9-_]{1,128}$/,
              message: `${intl.formatMessage({
                id: 'component.cluster.cluster_tips',
              })}`,
            },
          ]}
        />
      </ModalForm>
    );
  };

  const renderRemove = () => {
    return (
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({ id: 'component.cluster.cluster_del' })}
        width={400}
        visible={modalDeleteVisible}
        onVisibleChange={setModalDeleteVisible}
        modalProps={{
          centered: true,
        }}
        onFinish={async (values) => {
          const localCluster = clusters.find((c) => c.is_local);
          const res = await dsmClustersDeleteCluster({
            cluster_id: localCluster?.id || '',
            del_clusterid: [editingCluster?.id || ''],
            name: editingCluster?.name || '',
          });
          if (res.success) {
            res.message?.success(res.msg);
          } else {
            res.message?.error(res.msg);
          }
          refresh();
          return true;
        }}
      >
        <div>
          {editingCluster?.name} ({editingCluster?.ip})
        </div>
      </ModalForm>
    );
  };

  return (
    <>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        className={styles.action}
        getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
      >
        <span className="anticon">
          <span>{currentCluster?.name}</span>
          <CaretDownOutlined className={styles.downArrow} />
        </span>
      </Dropdown>
      {renderAdd()}
      {renderEdit()}
      {renderRemove()}
    </>
  );
};

export default ClusterDropdown;
