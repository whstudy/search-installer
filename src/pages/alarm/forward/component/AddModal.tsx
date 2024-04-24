import { Button, Form } from 'antd';
import { ModalForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useEffect, useState } from 'react';
import { dsmAlertConfSmtpMail } from '@/services/dsm/alert';
import { FormattedMessage, useIntl } from 'umi';

type NotifyModal = { id?: number; email: string; level: string[] };

const submit = async (record, values) => {
  let payload = values;
  if (record) {
    payload = { ...record, ...values };
  }
  const res = await dsmAlertConfSmtpMail(payload);
  if (res.success) {
    res.message?.success(res.msg);
  } else {
    res.message?.error(res.msg);
  }
};

export default (props: { record?: NotifyModal; reload: () => void }) => {
  const { record, reload } = props;
  const [form] = Form.useForm<NotifyModal>();
  const intl = useIntl();
  const modeText = record
    ? intl.formatMessage({ id: 'action.edit' })
    : intl.formatMessage({ id: 'action.add' });
  const [visible, setVisible] = useState(false);
  const LocalePrefix = 'storage.objectService.user.';
  const tooltips = {
    name: intl.formatMessage({ id: `${LocalePrefix}regex.name.invalidMsg` }),
    email: intl.formatMessage({ id: `${LocalePrefix}regex.email.invalidMsg` }),
    desc: intl.formatMessage({ id: `storage.objectService.regex.desc.invalidMsg` }),
  };

  useEffect(() => {
    if (!visible) {
      form.setFieldsValue({ email: `` });
    }
    if (visible && record && form) {
      const { email, level } = record;
      form.setFieldsValue({ email, level });
    }
  }, [form, record, visible]);
  return (
    <ModalForm<NotifyModal>
      form={form}
      title={`${modeText}${intl.formatMessage({ id: 'monitor.notify.recipient' })}`}
      width={450}
      trigger={<Button type="link">{modeText}</Button>}
      onFinish={async (values) => {
        await submit(record, values);
        reload();
        return true;
      }}
      initialValues={{
        level: ['info'],
      }}
      onVisibleChange={(v) => setVisible(v)}
    >
      <ProFormText
        disabled={Boolean(record)}
        name="email"
        label={intl.formatMessage({ id: 'monitor.notify.recipientEmail' })}
        rules={[{ required: true, type: 'email', message: tooltips.email }]}
      />

      <ProFormCheckbox.Group
        name="level"
        layout="horizontal"
        label={intl.formatMessage({ id: 'monitor.notify.alarmLevel' })}
        options={[
          {
            label: <FormattedMessage id="storage.pool.critical" defaultMessage="紧急" />,
            value: 'critical',
          },
          {
            label: <FormattedMessage id="storage.pool.major" defaultMessage="重要" />,
            value: 'important',
          },
          {
            label: <FormattedMessage id="storage.pool.minor" defaultMessage="普通" />,
            value: 'normal',
          },
          {
            label: (
              <FormattedMessage id="monitor.historyAlarm.severity.warning" defaultMessage="警告" />
            ),
            value: 'warning',
          },
          {
            label: (
              <FormattedMessage
                id="monitor.historyAlarm.severity.information"
                defaultMessage="信息"
              />
            ),
            value: 'info',
          },
        ]}
        rules={[{ required: true }]}
      />
    </ModalForm>
  );
};
