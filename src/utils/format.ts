import _, { isNaN } from 'lodash';
import type { ProColumnType } from '@ant-design/pro-table';

const checkIsInteger = (num: number) => {
  if (Number.isInteger(num)) {
    return num;
  }
  return Math.floor(num * 10) / 10;
};

export const formatUnit = (val: number | undefined) => {
  if (Number(val) > 0) {
    const num = typeof val === 'number' ? val : val * 1;
    if (num >= 1024 * 1024 * 1024 * 1024) {
      // bytes format to TB
      return `${checkIsInteger(num / (1024 * 1024 * 1024 * 1024))} TB`;
    }
    if (num >= 1024 * 1024 * 1024) {
      // bytes format to GB
      return `${checkIsInteger(num / (1024 * 1024 * 1024))} GB`;
    }
    if (num >= 1024 * 1024) {
      // bytes format to MB
      return `${checkIsInteger(num / (1024 * 1024))} MB`;
    }
    if (num >= 1024) {
      // bytes format to KB
      return `${checkIsInteger(num / 1024)} KB`;
    }
    if (num < 1024) {
      // show bytes
      return `${checkIsInteger(num)} B`;
    }
  }
  return '0 B';
};

export const formatTime = (time: string | undefined) => {
  if (time) {
    return time.replace(/T/g, ' ');
  }
  return '';
};

/**
 * 将B/s转化为采用合适的大速率单位显示(扩展to be done:，其他单位到大单位的换算)
 * 处理优先级：1）寻找合适的大单位， 能换算成整数；2)寻找能合适的大单位，保留2位小数
 * @param value
 * @param valueType 'string' | 'array'  string用于页面展示，array用于数据交互
 * @returns string: '45 MB/s' | array: [45, 'MS/s]
 */
export function formatUIRate(value, valueType = 'string') {
  const defaultUnit = 'B/s';
  let result: any = `0 ${defaultUnit}`;
  if (value && !isNaN(value)) {
    const mapping = [
      { key: 'GB/s', span: [1024, 3] },
      { key: 'MB/s', span: [1024, 2] },
      { key: 'KB/s', span: [1024, 1] },
    ];
    // 大单位且整数
    const integerIndex = _.findIndex(mapping, (v, key) => {
      return (
        value / Math.pow(v?.span?.[0], v?.span?.[1]) >= 1 &&
        !(value % Math.pow(v?.span?.[0], v?.span?.[1]))
      );
    });
    if (integerIndex === -1) {
      // 大单位，处理小数位
      const largeUnitIndex = _.findIndex(mapping, (v, key) => {
        return value / Math.pow(v?.span?.[0], v?.span?.[1]) >= 1;
      });
      if (largeUnitIndex !== -1) {
        const item = mapping?.[largeUnitIndex];
        const newValue = value / Math.pow(item?.span?.[0], item?.span?.[1]);
        result = `${newValue.toFixed(1)} ${item?.key}`;
      } else {
        result = `${value.toFixed(1)} ${defaultUnit}`;
      }
    } else {
      const item = mapping?.[integerIndex];
      const newValue = value / Math.pow(item?.span?.[0], item?.span?.[1]);
      result = `${newValue} ${item?.key}`;
    }
  }
  if (valueType === 'array') {
    return result?.split(' ');
  }
  return result;
}

// 速率大单位转化为小单位，通常用于数据传参
export function getRateBytes(value, unit) {
  if (value && !isNaN(value)) {
    const mapping = {
      tb: { key: 'TB/s', span: [1024, 4] },
      gb: { key: 'GB/s', span: [1024, 3] },
      mb: { key: 'MB/s', span: [1024, 2] },
      kb: { key: 'KB/s', span: [1024, 1] },
      b: { key: 'B/s', span: [1024, 0] },
    };
    const item = mapping?.[unit.toLowerCase()];
    return value * Math.pow(item?.span?.[0], item?.span?.[1]);
  }

  return 0;
}

/**
 * 格式化超出显示宽度 例如10w 以上的数字
 * @param value 原值
 * @param mark 例如9位数以后处理成格式化值，之前保持并判断是否为大值
 * @returns
 */
export const formatBigNum = (value: number, mark = 5) => {
  if (typeof value !== 'number' || isNaN(Number(value)) || value < Math.pow(10, mark)) {
    return { isLarge: false, value };
  }
  let integrityNum: number = value;
  let power = 0;
  for (let i = 20; i >= mark; i--) {
    integrityNum = Math.floor(value / Math.pow(10, i));
    if (integrityNum > 1) {
      power = i;
      break;
    }
  }
  return {
    isLarge: true,
    value: `${integrityNum}*1e${power}`,
  };
};

export type RequestParamProps = {
  preindex?: number;
  sufindex?: number;
  fuzzy?: string;
  keyword?: string;
  filters?: Record<string, any>;
  sort_field?: string;
  sort_rule?: 'desc' | 'asc';
};

export function isEmpty(val) {
  let result = false;
  if (typeof val !== 'number') {
    result = _.isEmpty(val);
  } else {
    result = false;
  }
  return result;
}

export function isNotEmpty(val) {
  return !isEmpty(val);
}

export const formatRequestParams = (
  searchKeys: string[],
  params: any,
  sorter: any,
  filters: any,
) => {
  const result: RequestParamProps = {};
  let tempFilter: any = {};

  if (params?.current && params?.pageSize) {
    result.preindex = (params.current - 1) * params.pageSize + 1;
    result.sufindex = params.current * params.pageSize;
  }

  if (!_.isEmpty(params.keyword?.trim())) {
    result.fuzzy = searchKeys.join(',');
    result.keyword = params.keyword?.trim();
  }

  if (!_.isEmpty(filters)) {
    _.forIn(filters, (v, k) => {
      if (typeof v !== 'number' && _.isEmpty(v)) {
        tempFilter = _.omit(filters, k);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (_.isArray(v)) {
          tempFilter[k] = _.join(v, ',');
        } else {
          tempFilter[k] = v;
        }
      }
    });
  }

  if (!_.isEmpty(tempFilter)) {
    result.filters = tempFilter;
  }

  if (!_.isEmpty(sorter)) {
    _.forIn(sorter, (v, k) => {
      if (!_.isEmpty(v)) {
        result.sort_field = k;
        result.sort_rule = v === 'descend' ? 'desc' : 'asc';
      }
    });
  }

  return result;
};

export type customizeProColumn = {
  translate?: string;
} & ProColumnType;

export type customizeProColumnConfig = {
  localePrefix?: string;
  localeFn: (value) => JSX.Element;
  columns: customizeProColumn[];
};

export function initColumns<T>(configs: customizeProColumnConfig): T[] {
  const result: T[] = [];
  _.forEach(configs.columns, (k) => {
    // if (k extends keyof T) {
    const item: ProColumnType = k;
    item.title = k?.translate
      ? configs.localeFn(k.translate)
      : configs.localeFn(`${configs.localePrefix}${k.dataIndex}`);

    if (k?.sorter) {
      // item.defaultSortOrder = 'descend';
      // item.sortDirections = ['descend', 'ascend', 'descend'];
      item.defaultSortOrder = null;
      item.sortDirections = ['descend', 'ascend', null];
    }

    if (k?.filters) {
      item.onFilter = true;
    }

    result.push(item as T);
    // }
  });
  return result;
}

const timesMapping = [
  { key: 'year', span: 365 * 24 * 3600 },
  { key: 'week', span: 7 * 24 * 3600 },
  { key: 'day', span: 24 * 3600 },
  { key: 'hour', span: 3600 },
  { key: 'minute', span: 60 },
];
/**
 * 把其他时间换算成秒
 * @param param0
 * @returns
 */
export function getSeconds([number, unit]) {
  if (isNaN(number)) {
    return 0;
  }
  if (number && unit) {
    return Number(number) * (timesMapping?.filter((v) => v?.key === unit)?.[0]?.span ?? 1);
  } else {
    return 0;
  }
}

/**
 * 把秒换成其他合适的大单位
 * @param seconds  number
 * @param valueType  'string' | 'array'  string用于页面展示，array用于数据交互
 * @returns string: '45 year' | array: [45, 'year']
 */
export function getTimeUnit(seconds, valueType = 'string') {
  const defaultUnit = 'seconds';
  let result = `0 ${defaultUnit}`;
  const integerIndex = _.findIndex(timesMapping, (v, key) => {
    return seconds / v?.span >= 1 && !(seconds % v?.span);
  });
  if (integerIndex !== -1) {
    const timeItem = timesMapping[integerIndex];
    result = `${seconds / timeItem?.span} ${timeItem?.key}`;
  } else {
    const largeUnitIndex = _.findIndex(timesMapping, (v, key) => {
      return seconds / v?.span >= 1;
    });
    if (largeUnitIndex !== -1) {
      const timeItem = timesMapping?.[largeUnitIndex];
      const newValue = seconds / timeItem?.span;
      result = `${newValue.toFixed(1)} ${timeItem?.key}`;
    } else {
      result = `${seconds} ${defaultUnit}`;
    }
  }
  if (valueType === 'array') {
    const [number, unit] = result?.split(' ') || [0, defaultUnit];
    return [Number(number), unit];
  }
  return result;
}
