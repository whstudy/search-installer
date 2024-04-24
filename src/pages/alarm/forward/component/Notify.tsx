import ProForm, {
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Divider, Modal, Popconfirm, Space, Spin, Typography } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { FormattedMessage, useIntl, useModel, useAccess } from 'umi';
import useTable from './useTable';
import styles from '../index.less';
import AddModal from './AddModal';
import {
  dsmAlertDelSmtpMail,
  dsmAlertGetSmtpConfigGet,
  dsmAlertGetSmtpMailsGet,
  dsmAlertSetSmtpConfig,
  dsmAlertTestSmtpConfig,
} from '@/services/dsm/alert';
import { useEffect } from 'react';
import { useMemo } from 'react';
import _ from 'lodash';

type SMTP = {
  auth: boolean;
  email: string;
  enable: boolean;
  encrypt: string;
  host: string;
  lang: string;
  name: string;
  password: string;
  port: number;
};

const levelMap = {
  // 告警通知的告警级别修改为与当前告一致
  critical: 'critical',
  important: 'major',
  normal: 'minor',
  warning: 'warning',
  info: 'information',
};

const genColumnsUser = ({ reload, intl, confirmDelete }) => [
  {
    title: intl.formatMessage({ id: 'monitor.notify.recipient' }),
    dataIndex: 'email',
  },
  {
    title: intl.formatMessage({ id: 'monitor.notify.alarmLevel' }),
    width: 300,
    dataIndex: 'level',
    renderText: (text) =>
      text
        .map((n) => intl.formatMessage({ id: `monitor.historyAlarm.severity.${levelMap[n]}` }))
        .join(' '),
  },
  {
    title: intl.formatMessage({ id: 'action.operation' }),
    width: 150,
    key: 'operation',
    render: (textNode, record) => (
      <Space>
        <AddModal record={record} key="edit" reload={reload} />
        <Button type="link" onClick={() => confirmDelete(record)}>
          {intl.formatMessage({ id: 'action.delete' })}
        </Button>
      </Space>
    ),
  },
];

const AlarmNotify: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id;
  const intl = useIntl();
  const { admin } = useAccess();
  const [isAuth, setIsAuth] = useState(false);
  const [testLoading, setTestLoading] = useState<boolean>(false); // test Loading
  const [loading, setLoading] = useState(true);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [addressee, setAddressee] = useState();
  const formRef = useRef<any>();
  const tableRef = useRef<ActionType>();

  const [requestUser, total = 0] = useTable<API.getSmtpMail>(dsmAlertGetSmtpMailsGet, {
    cluster_id,
  });
  const reload = useCallback(() => {
    tableRef.current?.reload();
  }, [tableRef]);
  const toolBar = useMemo(
    () => (total > 32 ? false : () => [<AddModal reload={reload} />]),
    [reload, total],
  );
  const columnsUser = useMemo(
    () => genColumnsUser({ reload, intl, confirmDelete }),
    [intl, reload],
  );

  function confirmDelete(record) {
    setDeleteVisible(true);
    setAddressee(record);
  }

  const handleDelete = async (record) => {
    setDeleteVisible(false);
    const { id } = record;
    const res = await dsmAlertDelSmtpMail({ id });
    if (res.success) {
      res.message?.success(res.msg);
      reload();
    } else {
      res.message?.error(res.msg);
    }
  };

  const handleCheck = async () => {
    const values = await formRef.current.validateFields();
    const testParamValue: any = _.mapValues(values, (item) => {
      return typeof item === 'string' ? item.replace(/\s/g, '') : item;
    });
    setTestLoading(true);
    const res = await dsmAlertTestSmtpConfig(testParamValue);
    const { success, data, message, msg } = res;
    setTestLoading(false);
    if (success) {
      if (data?.result) {
        message?.success(
          intl.formatMessage({ id: 'dir.alarm.forward.test.success', defaultMessage: '测试成功' }),
        );
      } else {
        message?.error(
          intl.formatMessage({
            id: 'dir.alarm.forward.test.error',
            defaultMessage: '测试失败，请重新输入参数配置',
          }),
        );
      }
    } else {
      message?.error(msg);
    }
  };

  const fetch = async () => {
    setLoading(true);
    const res = await dsmAlertGetSmtpConfigGet();
    setLoading(false);
    if (res.success) {
      const { data } = res;
      if (data) {
        formRef?.current?.setFieldsValue(data);
        setIsAuth(data.auth);
      }
    } else {
      res.message?.error(res.msg);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <ProForm
          formRef={formRef}
          disabled={!admin}
          onValuesChange={(changed, allValues) => {
            setIsAuth(allValues?.auth);
          }}
          onFinish={async (values: any) => {
            const paramValue: any = _.mapValues(values, (item) => {
              return typeof item === 'string' ? item.replace(/\s/g, '') : item;
            });
            const res = await dsmAlertSetSmtpConfig(paramValue);
            if (res.success) {
              fetch();
              res.message?.success(
                intl.formatMessage({
                  id: 'dir.alarm.forward.mailSetting.complete',
                  defaultMessage: '邮件告警通知设置完成',
                }),
              );
            } else {
              res.message?.error(res.msg);
            }
          }}
          initialValues={{
            enable: true,
            port: 25,
            encrypt: 'ssl',
            lang: 'zh-CN',
            auth: false,
          }}
          wrapperCol={{ span: 24 }}
          submitter={
            admin && {
              searchConfig: {
                submitText: intl.formatMessage({ id: 'component.button.save' }),
              },
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
            }
          }
        >
          <ProForm.Group>
            <ProFormCheckbox name="enable">
              <FormattedMessage id="component.button.enable" />
            </ProFormCheckbox>
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="lg"
              name="email"
              label={intl.formatMessage({ id: 'monitor.notify.senderEmail' })}
              rules={[{ required: true }, { type: 'email' }]}
            />
            <ProFormText
              width="lg"
              name="host"
              label="SMTP"
              rules={[{ required: true, whitespace: true }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width="lg"
              options={[
                {
                  value: 'zh-CN',
                  label: intl.formatMessage({ id: 'component.zh' }),
                },
                {
                  value: 'en-US',
                  label: intl.formatMessage({ id: 'component.en' }),
                },
              ]}
              name="lang"
              label={intl.formatMessage({ id: 'monitor.notify.mainConf' })}
              rules={[{ required: true }]}
            />
            <ProFormDigit
              width="lg"
              name="port"
              label={intl.formatMessage({ id: 'monitor.notify.port' })}
              rules={[{ required: true }]}
            />
          </ProForm.Group>
          <ProFormRadio.Group
            name="encrypt"
            label={intl.formatMessage({ id: 'monitor.notify.isSecure' })}
            options={[
              {
                label: intl.formatMessage({ id: 'monitor.notify.ssl' }),
                value: 'ssl',
              },
              {
                label: intl.formatMessage({ id: 'monitor.notify.starttls' }),
                value: 'starttls',
              },
              {
                label: intl.formatMessage({ id: 'monitor.notify.noEncrypt' }),
                value: 'none',
              },
            ]}
          />
          <ProForm.Group>
            <ProFormCheckbox name="auth">
              <FormattedMessage id="monitor.notify.smtpAuth" />
            </ProFormCheckbox>
          </ProForm.Group>
          {isAuth ? (
            <div className={`${styles.divSmtpContainer}`}>
              <ProForm.Group align="start">
                <ProFormText
                  width="md"
                  name="name"
                  label={intl.formatMessage({ id: 'component.uname' })}
                  rules={[{ required: true, whitespace: true }]}
                />
                <ProFormText.Password
                  width="md"
                  name="password"
                  label={intl.formatMessage({ id: 'component.passwd' })}
                  rules={[{ required: true, whitespace: true }]}
                />
                <Button
                  className={`${styles.btntest}`}
                  loading={testLoading}
                  onClick={() => handleCheck()}
                >
                  <FormattedMessage id="monitor.notify.test" />
                </Button>
              </ProForm.Group>
            </div>
          ) : null}
        </ProForm>
      </Spin>
      <ProTable
        actionRef={tableRef}
        columns={columnsUser}
        request={requestUser}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showTotal: undefined,
          size: 'default',
        }}
        options={false}
        search={false}
        bordered={false}
        cardProps={{
          bodyStyle: { padding: 0 },
        }}
        size="small"
        rowKey="id"
        toolBarRender={toolBar}
      />

      <Modal
        centered
        title={<FormattedMessage id="monitor.notify.deleteReciever" />}
        visible={deleteVisible}
        onOk={() => handleDelete(addressee)}
        onCancel={() => setDeleteVisible(false)}
      >
        {intl.formatMessage({
          id: 'action.confirmDeletion',
        })}
      </Modal>
    </>
  );
};

export default AlarmNotify;
