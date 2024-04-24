import _ from 'lodash';

// 对象个数回显至列表、输入框中（单位与值需分开）
const numSizeformatNum = (val) => {
  let capValue;
  let tag;
  let strNumber = String(val).trim();

  if (val >= 10000000 && val % 10000000 === 0) {
    tag = 10000 * 1000;
    capValue = (val / (10000 * 1000)).toFixed(0);
  } else if (val >= 10000 && val % 10000 === 0) {
    tag = 10000;
    capValue = val / 10000;
  } else {
    tag = 1;
    capValue = val;
  }
  let unit = '';
  while (strNumber.length > 3) {
    unit = ',' + strNumber.slice(-3) + unit;
    strNumber = strNumber.slice(0, -3);
  }
  unit = strNumber + unit;

  return {
    capValue: capValue,
    tag: tag,
    unit: unit,
  };
};

// 容量配额回显至输入框中（需分别获取值和单位）
const capacityQuotaformatNum = (val) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let convertedValue = val;
  let unitIndex = 0;
  let finalValue;
  if (val && val > 0) {
    while (convertedValue >= 1024 && unitIndex < units.length - 1) {
      convertedValue /= 1024;
      if (convertedValue % 1 === 0) {
        // 只有在整除时才进位
        finalValue = convertedValue;
        unitIndex++;
      } else {
        break;
      }
    }

    // 因目前系统中默认最小单位均为“MB”，因此在配额为默认值整除后，单位小于 “MB"时，需转换为最小单位并取整
    if (unitIndex < 2) {
      finalValue = (val / (1024 * 1024)).toFixed(0);
      unitIndex = 2;
    }
    return {
      capValue: finalValue,
      tag: Math.pow(1024, unitIndex),
    };
  } else {
    return {
      capValue: null,
      tag: Math.pow(1024, 2),
    };
  }
};

// 对象个数配额单位
const numUnitList = (intl) => {
  return [
    {
      label: intl.formatMessage({
        id: 'storage.objectService.individual',
        defaultMessage: '个',
      }),
      value: 1,
    },
    {
      label: intl.formatMessage({
        id: 'storage.objectService.tenThousand',
        defaultMessage: '万',
      }),
      value: 10000,
    },
    {
      label: intl.formatMessage({
        id: 'storage.objectService.tenMillion',
        defaultMessage: '千万',
      }),
      value: 10000 * 1000,
    },
  ];
};

// 容量配额单位
const capUnitList: any = [
  { label: 'MB', value: 1024 * 1024 },
  { label: 'GB', value: 1024 * 1024 * 1024 },
  { label: 'TB', value: 1024 * 1024 * 1024 * 1024 },
];

// 配额规格
const quotaSpecification = {
  MaxCapacity: {
    1048576: 1000000000000,
    1073741824: 1000000000,
    1099511627776: 1000000,
  }, // 无具体最大值限制, 因此页面设定最大值为y一百万TB，key 分别为单位：MB,GB,TB，多用于容量配额
  hundredBillion: {
    1: 100000000000,
    10000: 10000000,
    10000000: 10000,
  }, // 1000亿 目前系统支持最大对象个数，key 分别为单位：个、万、千万
  milliard: {
    1: 1000000000,
    10000: 100000,
    10000000: 100,
  }, // 10亿 单桶支持最大对象个数，key 分别为单位：个、万、千万
  thousand: {
    1: 1000,
  }, // 1000，单用户支持桶的最大个数，无单位
  maxNumber: 100000000000, // 1000亿 目前无具体数额限制的配额可输入值
};

export { numSizeformatNum, capacityQuotaformatNum, numUnitList, capUnitList, quotaSpecification };
