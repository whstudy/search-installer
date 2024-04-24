import { InfoCircleOutlined } from '@ant-design/icons';
import { ProFormDigit, ProFormSelect } from '@ant-design/pro-form';
import { FormattedMessage, useIntl } from 'umi';
import { capacityUnitMapping, rateUnitMapping, timeUnitMapping } from './util';
import styles from './index.less';

type propsType = {
  initialValue?: { number: Number | undefined; unit?: string | undefined };
  unitType?: 'time' | 'capacity' | 'rate'; // 扩展类型xx, 就去util定义 xxMapping
  unitProps?: { units?: string[] } & any; // ProFormField属性
  [key: string]: any;
};

/**
 * select with unit组件. 默认使用用容量配额的配置
 * @param param0
 * @returns
 */
const SelectWithUnit = ({
  initialValue = { number: undefined },
  unitType = 'capacity',
  max,
  unitProps,
  selectName,
  ...numberProps
}: propsType) => {
  const intl = useIntl();
  const { number, unit } = initialValue || {};
  const { units } = unitProps || {};

  function getUnitOptions() {
    let mapping: any[] = [];
    switch (unitType) {
      case 'rate':
        mapping = rateUnitMapping;
        break;
      case 'time':
        mapping = timeUnitMapping;
        break;
      default:
        mapping = capacityUnitMapping;
        break;
    }
    return mapping
      ?.filter((v) => !units?.length || units?.includes(v?.key?.toLowerCase()))
      ?.map((v) => ({
        label: v?.locale,
        value: v?.key,
      }));
  }

  const options = getUnitOptions();
  const tooltip = {
    icon: <InfoCircleOutlined />,
    title: (
      <FormattedMessage
        id="component.formitem.positiveReuqired"
        values={{ field: intl.formatMessage({ id: 'component.formitem.capacityQuota' }) }}
      />
    ),
    getPopupContainer: (triggerNode) =>
      triggerNode?.parentNode?.parentNode?.parentNode as HTMLElement,
    ...(numberProps?.tooltip ?? {}),
  };
  const fieldProps = {
    addonAfter: (
      <ProFormSelect
        name={selectName ?? 'unit'}
        initialValue={unit ?? options?.[0]?.value}
        options={options}
        {...(unitProps ?? {})}
        fieldProps={{
          getPopupContainer: (triggerNode) => triggerNode?.parentNode as HTMLElement,
          ...(unitProps?.fieldProps ?? {}),
        }}
        formItemProps={{
          className: styles.selectWithUnit,
          style: { marginBottom: 0 },
          ...(unitProps?.formItemProps ?? {}),
        }}
      />
    ),
    min: 1,
    precision: 0,
    ...(numberProps?.fieldProps ?? {}),
  };
  const formItemProps = {
    style: { position: 'relative' },
    ...(numberProps?.formItemProps ?? {}),
  };
  return (
    <>
      <ProFormDigit
        required={true}
        name="number"
        initialValue={number}
        label={<FormattedMessage id="component.formitem.capacityQuota" />}
        min={1}
        {...(numberProps ?? {})}
        tooltip={tooltip}
        fieldProps={fieldProps}
        formItemProps={formItemProps}
      />
    </>
  );
};

export default SelectWithUnit;
