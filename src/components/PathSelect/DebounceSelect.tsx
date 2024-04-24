import { useDebounceFn } from 'ahooks';
import { AutoComplete, Spin } from 'antd';
import { useEffect, useState } from 'react';

const DebounceSelect = (props) => {
  const { value, fetchOptions, debounceTimeout = 800, ...restProps } = props;
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const { run } = useDebounceFn(
    async (path) => {
      setOptions([]);
      setFetching(true);
      const newOptions = await fetchOptions(path);
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
      showArrow={false}
      filterOption={false}
      value={value}
      notFoundContent={fetching ? <Spin size="small" /> : <></>}
      options={options}
      style={{
        width: '100%',
      }}
      {...restProps}
    />
  );
};

export default DebounceSelect;
