import { FormattedMessage } from 'umi';
import { useRef, useState } from 'react';
import { Button } from 'antd';
import type { FormInstance } from 'antd';
import ProForm from '@ant-design/pro-form';
import _ from 'lodash';
import type { CustomizeFormItemsProps } from './FormItemGenerator';
import FormItemGenerator from './FormItemGenerator';
import { useEffect } from 'react';
import React from 'react';

export interface FormConfigProps {
  title: React.ReactNode;
  mode: string;
  data: any;
  onVisibleChange: (v: boolean) => void;
}

export interface CustomizeFormProps extends CustomizeFormItemsProps {
  initialValues: any;
  children?: React.ReactNode;
  onFinish: (values) => Promise<boolean>;
  onCancel: () => void;
  resetForm: boolean;
  onFormChange?: ({ changed, all }) => void; // 回填数据用于联动
}

function CustomizeForm(parentProps: CustomizeFormProps) {
  const { onFinish, onCancel, onFormChange, ...rest } = parentProps;
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (rest?.initialValues) {
      formRef?.current?.setFieldsValue({ ...rest.initialValues });
    }
    if (rest?.resetForm) {
      setLoading(false);
      formRef?.current?.resetFields();
    }
  }, [rest?.initialValues, rest.resetForm]);

  return (
    <ProForm
      formRef={formRef}
      onFinish={async () => {
        setLoading(true);
        const success = await onFinish(formRef?.current?.getFieldsValue());
        if (!success) {
          setLoading(false);
        }
      }}
      onValuesChange={(changed, all) => onFormChange?.({ changed, all })}
      submitter={{
        render: (props, doms) => {
          return [
            <Button key="cancel" onClick={onCancel}>
              <span>
                <FormattedMessage id="component.button.cancelText" defaultMessage="取消" />
              </span>
            </Button>,
            <Button key="confirm" type="primary" htmlType="submit" loading={loading}>
              <span>
                <FormattedMessage id="action.ensure" defaultMessage="确定" />
              </span>
            </Button>,
          ];
        },
      }}
    >
      {<FormItemGenerator mode={rest.mode} localPrefix={rest.localPrefix} items={rest.items} />}
      {rest?.children}
    </ProForm>
  );
}
export default CustomizeForm;
