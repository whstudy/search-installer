import { useState } from 'react';
import DebounceSelect from './DebounceSelect';
import { useControllableValue } from 'ahooks';
import useFetchPath from './useFetchPath';
import type { AutoCompleteProps } from 'antd';

type PathSelectProps = {
  value: string;
  onChange: (path: string) => void;
  combobox?: boolean;
  placeholder?: React.ReactNode;
  selectProps?: Omit<AutoCompleteProps, 'value' | 'onChange'>;
  funcSource?: string;
  defaultPool?: string;
  // 创建目录用，清空和选择时为有效变更值
  handleSelect?: (path) => void;
  handleClear?: (path) => void;
};
const PathSelect: React.FC<PathSelectProps> = (props) => {
  const { combobox = false, placeholder, selectProps, funcSource, defaultPool } = props;
  const [value, setValue] = useControllableValue<string>(props);
  const [selectValue, setSelectValue] = useState(value);
  const fetchOptions = useFetchPath(funcSource === 'graph' ? defaultPool : '');
  return (
    <DebounceSelect
      value={value}
      getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
      fetchOptions={fetchOptions}
      onChange={(newValue) => {
        // 清空
        if (!newValue) {
          setValue('/');
          props?.handleClear?.('/');
        } else {
          setValue(newValue);
        }
      }}
      onSelect={(newValue) => {
        setSelectValue(newValue);
        props?.handleSelect?.(newValue);
      }}
      onBlur={() => {
        if (!value) {
          setValue('/');
          setSelectValue('/');
          return;
        }
        if (value == '/') {
          setSelectValue('/');
          return;
        }
        if (!combobox) {
          setValue(selectValue);
        }
      }}
      placeholder={placeholder}
      {...selectProps}
    />
  );
};

export default PathSelect;
