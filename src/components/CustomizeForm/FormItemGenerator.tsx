import type { Rule } from 'antd/lib/form';
import { useIntl } from 'react-intl';
import { Input, InputNumber } from 'antd';
import type { ProSchema } from '@ant-design/pro-utils/lib/typing';
import ProForm, {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';
import { CheckCard } from '@ant-design/pro-card';
import _ from 'lodash';
import { InfoCircleOutlined } from '@ant-design/icons';

export enum ValueTypes {
  text = 'text',
  password = 'password',
  email = 'email',
  textArea = 'textArea',
  select = 'select',
  selectOpts = 'selectOpts',
  checkbox = 'checkbox',
  radioGroup = 'radioGroup',
  slider = 'slider',
  switch = 'switch',
  unitGroup = 'unitGroup',
  cardGroup = 'cardGroup',
  customize = 'customize',
  digit = 'digit',
}

export enum Modes {
  create = 'create',
  edit = 'edit',
  delete = 'delete',
}

export interface CustomizeFormItemsProps {
  items: {
    name: string;
    valueType: ValueTypes;
    label?: string;
    rules?: Rule[];
    disabled?: string[];
    request?: ProSchema['request'];
    valueEnum?: any;
    defaultSelectOpt?: any;
    placeholder?: Record<string, any>;
    tooltip?: any;
    required?: boolean;
    hidden?: boolean;
    dependencies: any;
  }[];
  mode: string;
  localPrefix: string;
}

export function parseFormFields(data: any, keys: string[]) {
  const result: any = {};
  _.forEach(keys, (v) => {
    const value = data?.[v];
    if (typeof value === 'boolean') {
      result[v] = value;
    } else {
      const trimmedValue = _.trim(value);
      result[v] = !_.isEmpty(trimmedValue) ? trimmedValue : undefined;
    }
  });
  return result;
}

function FormItemGenerator({ items, mode, localPrefix }: CustomizeFormItemsProps) {
  const intl = useIntl();

  return (
    <>
      {_.map(items, (item: any) => {
        if (item?.valueType === ValueTypes.text) {
          return (
            <ProFormText
              key={item.name}
              hidden={item?.hidden}
              required={item?.required}
              disabled={item?.disabled?.includes(mode)}
              name={item.name}
              label={intl.formatMessage({
                id: `${localPrefix}${item.label || item.name}`,
              })}
              placeholder={intl.formatMessage({
                id: `${item?.placeholder || 'component.input.tip'}`,
              })}
              rules={item?.rules}
              tooltip={
                item?.tooltip && {
                  icon: <InfoCircleOutlined />,
                  ...item?.tooltip,
                }
              }
            />
          );
          // eslint-disable-next-line no-else-return
        } else if (item?.valueType === ValueTypes.select) {
          return (
            <ProFormSelect.SearchSelect
              key={item.name}
              hidden={item?.hidden}
              required={item?.required}
              disabled={item?.disabled?.includes(mode)}
              name={item.name}
              mode="single"
              fieldProps={{
                labelInValue: false,
                onChange: item?.onchange,
                getPopupContainer: (triggerNode) => triggerNode?.parentNode as HTMLElement,
              }}
              label={intl.formatMessage({ id: `${localPrefix}${item.label || item.name}` })}
              placeholder={intl.formatMessage({
                id: `${item?.placeholder || 'component.input.tip'}`,
              })}
              rules={item?.rules}
              params={{}}
              request={item?.request}
            />
          );
        } else if (item?.valueType === ValueTypes.selectOpts) {
          return (
            <ProFormSelect
              key={item.name}
              hidden={item?.hidden}
              required={item?.required}
              disabled={item?.disabled?.includes(mode)}
              name={item.name}
              mode="single"
              fieldProps={{
                labelInValue: false,
                getPopupContainer: (triggerNode) => triggerNode?.parentNode as HTMLElement,
              }}
              label={intl.formatMessage({ id: `${localPrefix}${item.label || item.name}` })}
              placeholder={intl.formatMessage({
                id: `${item?.placeholder || 'component.input.tip'}`,
              })}
              rules={item?.rules}
              request={item?.request}
              tooltip={
                item?.tooltip && {
                  icon: <InfoCircleOutlined />,
                  ...item?.tooltip,
                }
              }
            />
          );
        } else if (item?.valueType === ValueTypes.password) {
          return (
            <ProForm.Item
              key={item.name}
              hidden={item?.hidden}
              required={item?.required}
              name={item.name}
              label={intl.formatMessage({ id: `${localPrefix}${item?.label || item.name}` })}
              rules={item?.rules}
              dependencies={item?.dependencies}
              tooltip={
                item?.tooltip && {
                  icon: <InfoCircleOutlined />,
                  ...item?.tooltip,
                }
              }
            >
              <Input.Password
                disabled={item?.disabled?.includes(mode)}
                placeholder={intl.formatMessage({
                  id: `${item?.placeholder || 'component.input.tip'}`,
                })}
                onCopy={(e) => {
                  e.preventDefault();
                }}
                onPaste={(e) => e.preventDefault()}
              />
            </ProForm.Item>
          );
        } else if (item?.valueType === ValueTypes.textArea) {
          return (
            <ProFormTextArea
              hidden={item?.hidden}
              key={item.name}
              required={item?.required}
              disabled={item?.disabled?.includes(mode)}
              name={item.name}
              label={intl.formatMessage({ id: `${localPrefix}${item?.label || item.name}` })}
              placeholder={intl.formatMessage({
                id: `${item?.placeholder || 'component.input.tip'}`,
              })}
              rules={item?.rules}
              tooltip={
                item?.tooltip && {
                  icon: <InfoCircleOutlined />,
                  ...item?.tooltip,
                }
              }
              fieldProps={item?.fieldProps}
            />
          );
        } else if (item?.valueType === ValueTypes.radioGroup) {
          return (
            <ProFormRadio.Group
              hidden={item?.hidden}
              key={item.name}
              required={item?.required}
              disabled={item?.disabled}
              name={item.name}
              label={intl.formatMessage({ id: `${localPrefix}${item?.label || item.name}` })}
              rules={item?.rules}
              tooltip={
                item?.tooltip && {
                  icon: <InfoCircleOutlined />,
                  ...item?.tooltip,
                }
              }
              options={item?.options}
              fieldProps={{
                onChange: item?.onchange,
              }}
              extra={item?.extra}
            />
          );
        } else if (item?.valueType === ValueTypes.unitGroup) {
          return (
            <ProFormDigit
              key={item?.name}
              name={item?.name}
              label={intl.formatMessage({ id: `${localPrefix}${item?.label || item?.name}` })}
              dependencies={[item.dependencies]}
              rules={item?.rules}
              min={item?.min}
              max={item?.max}
              fieldProps={{
                className: 'groupSelectItem',
                addonAfter: (
                  <ProFormSelect
                    fieldProps={{
                      onChange: item?.onchange,
                      getPopupContainer: (triggerNode) => triggerNode?.parentNode as HTMLElement,
                    }}
                    name={item?.dependencies}
                    initialValue={item?.initialValue}
                    request={item?.request}
                  />
                ),
                precision: 0,
              }}
            />
          );
        } else if (item?.valueType === ValueTypes.cardGroup) {
          return (
            <ProForm.Item
              key={item?.key}
              name={item?.name}
              label={intl.formatMessage({ id: `${localPrefix}${item?.label || item?.name}` })}
            >
              <CheckCard.Group options={item?.cardItems} onChange={item?.onchange} />
            </ProForm.Item>
          );
        } else if (item?.valueType === ValueTypes.customize) {
          return (
            <ProForm.Item
              key={item?.key}
              name={item?.name}
              required={item?.required}
              rules={item?.rules}
              label={intl.formatMessage({ id: `${localPrefix}${item.label || item.name}` })}
              tooltip={
                item?.tooltip && {
                  icon: <InfoCircleOutlined />,
                  ...item?.tooltip,
                }
              }
            >
              {item.children}
            </ProForm.Item>
          );
        } else if (item?.valueType === ValueTypes.digit) {
          return (
            <ProFormDigit
              key={item?.name}
              name={item?.name}
              label={intl.formatMessage({ id: `${localPrefix}${item?.label || item?.name}` })}
              dependencies={[item.dependencies]}
              rules={item?.rules}
              min={item?.min}
              max={item?.max}
              fieldProps={{
                className: 'groupSelectItem',
                precision: item?.precision ?? 0,
              }}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export default FormItemGenerator;
