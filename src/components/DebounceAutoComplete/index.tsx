import { useControllableValue, useDebounceFn } from 'ahooks';
import { AutoComplete, Spin } from 'antd';
import { useEffect, useState } from 'react';

const Index = (props) => {
  const { fetchOptions, debounceTimeout = 800, ...restProps } = props;
  const [value, setValue] = useControllableValue<string>(props);
  // const [selectValue, setSelectValue] = useState(value);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const { run } = useDebounceFn(
    async (keyword) => {
      setOptions([]);
      setFetching(true);
      const newOptions = await fetchOptions(keyword);
      setOptions(newOptions);
      setFetching(false);
    },
    {
      wait: debounceTimeout,
    },
  );

  useEffect(() => {
    run(value);
  }, [run, value]);

  return (
    <AutoComplete
      backfill
      showSearch
      allowClear
      defaultActiveFirstOption
      getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
      showArrow={false}
      filterOption={false}
      value={value}
      notFoundContent={fetching ? <Spin size="small" /> : <></>}
      options={options}
      style={{
        width: '100%',
      }}
      fetchOptions={fetchOptions}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      {...restProps}
    />
  );
};

export default Index;
