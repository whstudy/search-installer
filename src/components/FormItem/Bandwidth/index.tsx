import SelectWithUnit from '@/components/FormItem/SelectWithUnit';
import { formatUIRate, getRateBytes } from '@/utils';
import { FormattedMessage, useIntl } from 'umi';

type propsType = {
  name?: string;
  [key: string]: any;
};

/**
 * 带宽上限值 number + unit
 * customRule 自定义Rule function
 */
const BandwidthFormItem = ({
  initialValue,
  name,
  form,
  tooltip,
  max,
  min,
  units,
  label,
  selectName,
  customRule,
  ...props
}: propsType) => {
  const intl = useIntl();

  const formItemProps = {
    rules: [
      {
        validator: (_, value) => {
          const { [selectName]: unit } = form.getFieldsValue();
          const allBytes = getRateBytes(value, unit);
          if (min && allBytes < min) {
            return Promise.reject(
              intl.formatMessage(
                { id: 'qos.bandwidth.lowerLimit' },
                { limitation: formatUIRate(min) },
              ),
            );
          }

          if (allBytes > max) {
            return Promise.reject(
              intl.formatMessage(
                { id: 'qos.bandwidth.overLimit' },
                { limitation: formatUIRate(max) },
              ),
            );
          }

          if (customRule && typeof customRule === 'function') {
            return customRule();
          }
          return Promise.resolve();
        },
      },
    ],
  };

  const handleUnitChange = () => {
    form.validateFields();
  };

  const tooltipSet = {
    title: (
      <FormattedMessage
        id="component.formitem.positiveReuqired"
        values={{ field: label ?? intl.formatMessage({ id: 'qos.bandwidthUpperLimit' }) }}
      />
    ),
    ...(tooltip ?? {}),
  };
  return (
    <SelectWithUnit
      initialValue={initialValue}
      unitType="rate"
      name={name ?? 'bandwidth_limit'}
      label={label}
      required={false}
      selectName={selectName}
      {...props}
      tooltip={tooltipSet}
      formItemProps={formItemProps}
      unitProps={{ units, fieldProps: { onChange: handleUnitChange } }}
    />
  );
};

export default BandwidthFormItem;
