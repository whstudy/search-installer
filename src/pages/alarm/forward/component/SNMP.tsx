import { dsmAlertGetSnmpv3ConfigGet, dsmAlertSetSnmpv3Config } from '@/services/dsm/alert';
import { utilsReg } from '@/utils';
import ProForm, {
  ProFormCheckbox,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { Divider, Space, Spin, Switch, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl, useModel, useAccess } from 'umi';
const { Text } = Typography;

const AlarmSNMP: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id;
  const [loading, setLoading] = useState(true);
  const formRef = useRef<any>();
  const intl = useIntl();
  const { admin } = useAccess();

  const fetch = async () => {
    setLoading(true);
    const res = await dsmAlertGetSnmpv3ConfigGet();
    setLoading(false);
    if (res.success) {
      const { data } = res;
      if (data) {
        data.authproto = data.authproto || 'MD5';
        data.port = data.port || 161;
        data.encrptAlgo = data.encrptAlgo || 'DES';
        formRef.current.setFieldsValue(data);
      }
    } else {
      res.message?.error(res.msg);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Spin spinning={loading}>
      <ProForm
        formRef={formRef}
        disabled={!admin}
        onFinish={async (values: any) => {
          const paramValue: any = _.mapValues(values, (item) => {
            return typeof item === 'string' ? item.replace(/\s/g, '') : item;
          });
          const res = await dsmAlertSetSnmpv3Config(paramValue);
          if (res.success) {
            fetch();
            res.message?.success(
              intl.formatMessage({
                id: 'dir.alarm.forward.SNMPSetting.success',
                defaultMessage: '设置SNMP通知成功',
              }),
            );
          } else {
            res.message?.error(res.msg);
          }
        }}
        initialValues={{
          enable: true,
          ip: '',
          port: 161,
          authproto: 'MD5',
          encrptAlgo: 'DES',
        }}
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
            name="ip"
            label="Trap IP"
            rules={[
              {
                required: true,
              },
              {
                pattern: utilsReg.ipReg,
                message: intl.formatMessage({
                  id: 'systemSetting.ipValidator',
                  defaultMessage: '请输入正确的IP地址',
                }),
              },
            ]}
          />
          <ProFormDigit
            width="lg"
            name="port"
            label={`Trap ${intl.formatMessage({ id: 'monitor.notify.port' })}`}
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="lg"
            name="username"
            label={intl.formatMessage({ id: 'component.uname' })}
            rules={[{ required: true, whitespace: true }]}
          />
          <ProFormSelect
            width="lg"
            options={[
              {
                value: 'MD5',
                label: 'MD5',
              },
              {
                value: 'SHA',
                label: 'SHA',
              },
            ]}
            name="authproto"
            label={intl.formatMessage({ id: 'monitor.notify.authProto' })}
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password
            width="lg"
            name="password"
            label={intl.formatMessage({ id: 'monitor.notify.authPass' })}
            rules={[{ required: true, whitespace: true }]}
          />
          <ProFormSelect
            width="lg"
            options={[
              {
                value: 'DES',
                label: 'DES',
              },
              {
                value: 'AES',
                label: 'AES',
              },
            ]}
            name="encrptAlgo"
            label={intl.formatMessage({ id: 'monitor.notify.encryptAlg' })}
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password
            width="lg"
            name="encrptPass"
            label={intl.formatMessage({ id: 'monitor.notify.encryptPass' })}
            rules={[{ required: true, whitespace: true }]}
          />
        </ProForm.Group>
      </ProForm>
    </Spin>
  );
};
export default AlarmSNMP;
