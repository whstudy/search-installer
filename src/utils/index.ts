import isEmpty from 'lodash/isEmpty';
import { formatUnit } from './format';

export * from './regex';
export * from './message';
export * from './format';
export * from './validators';

/*state =  0  # 创建中
state =  1  # 已就绪
state =  2  # 删除中
state =  4  #  创建失败*/
export enum PoolStateEnum {
  creating = 0,
  created = 1,
  deleting = 2,
  fail = 4,
}

export const stateMap = {
  0: `storage.pool.creating`,
  1: `storage.pool.created`,
  2: `storage.pool.deleting`,
  4: `storage.pool.fail`,
};

export function emptyable(value, fallback: any = null) {
  return isEmpty(value) ? fallback : value;
}

export function getAvailableCapacity(item: API.querypool) {
  // 存储池容量配额
  const quotabytes = item?.quota_bytes || 0;
  // 总量
  const totalcapacity = item?.total_capacity || 0;
  // 已使用量
  const usedcapacity = item?.used_capacity || 0;
  // 可用量
  const savecapacity = totalcapacity - usedcapacity;
  let value;
  if (quotabytes === 0) {
    return formatUnit(savecapacity);
  }

  if (savecapacity > quotabytes) {
    value = quotabytes;
  } else {
    value = savecapacity;
  }
  return formatUnit(value);
}

export function getWizadDefaultSetting() {
  const config = JSON.parse(localStorage.getItem('wizaDefSetting') || '{}');
  return config;
}

type AlertConfigProps = {
  threshold: number;
  severity: number;
  availableThreshold: number;
  availableSeverity: number;
};
/**
 * 根据容量值、报警阈值，返回标记色
 */
export function getCapacityColor(capacity, alertConfig: AlertConfigProps) {
  if (!capacity.usedCapacity || !capacity.totalCapacity) return '#2A68BF';
  // 报警级别颜色值
  const SEVERITY_MAPPING = [
    { color: '#CE1126', severityNum: 5 },
    { color: '#ee6411', severityNum: 4 },
    { color: '#ee9611', severityNum: 3 },
    { color: '#f2b000', severityNum: 2 },
    { color: '#2A68BF', severityNum: 1 },
  ];
  // 已用容量
  const usedCapacity = capacity.usedCapacity;
  // 总容量
  const totalCapacity = capacity.totalCapacity;
  // 可用容量
  const usable = totalCapacity - usedCapacity;
  // 已用百分比
  const usedPerc = usedCapacity / totalCapacity;

  let progressColor = '';
  const numberPercent = usedPerc * 100;
  if (numberPercent >= 100 - alertConfig?.availableThreshold) {
    progressColor = SEVERITY_MAPPING?.filter(
      (v) => Number(v?.severityNum) === Number(alertConfig?.availableSeverity),
    )?.[0]?.color;
  } else if (numberPercent >= alertConfig?.threshold) {
    progressColor = SEVERITY_MAPPING?.filter(
      (v) => Number(v?.severityNum) === Number(alertConfig?.severity),
    )?.[0]?.color;
  }

  progressColor = progressColor || '#2A68BF';
  return progressColor;
}

export function getStringLength(value) {
  if (typeof value !== 'string') {
    return 0;
  }
  let nameLenth = 0;
  for (let i = 0, len = value?.length; i < len; i += 1) {
    if (value.charCodeAt(i) > 255) {
      // 全角
      nameLenth += 3;
    } else {
      nameLenth += 1;
    }
  }
  return nameLenth;
}
