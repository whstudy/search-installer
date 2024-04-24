// 全量mapping，用case array获取本功能展示的unit集合

import { getIntl } from 'umi';

export const timeUnitMapping = [
  { key: 'minute', span: 60, locale: getIntl().formatMessage({ id: 'component.timeUnit.minute' }) },
  { key: 'hour', span: 3600, locale: getIntl().formatMessage({ id: 'component.timeUnit.hour' }) },
  {
    key: 'day',
    span: 24 * 3600,
    locale: getIntl().formatMessage({ id: 'component.timeUnit.day' }),
  },
  {
    key: 'week',
    span: 7 * 24 * 3600,
    locale: getIntl().formatMessage({ id: 'component.timeUnit.week' }),
  },
  {
    key: 'month',
    span: 7 * 24 * 3600,
    locale: getIntl().formatMessage({ id: 'component.timeUnit.month' }),
  },
  {
    key: 'year',
    span: 365 * 24 * 3600,
    locale: getIntl().formatMessage({ id: 'component.timeUnit.year' }),
  },
];

export const timeUnitMapping1 = {
  minute: { key: 'minute', span: 60 },
  hour: { key: 'hour', span: 3600 },
  day: { key: 'day', span: 24 * 3600 },
  week: { key: 'week', span: 7 * 24 * 3600 },
  year: { key: 'year', span: 365 * 24 * 3600 },
  // _.pick(timeUnitMapping1, ['minute, hour, day])
};

// unit/s
export const rateUnitMapping = [
  { key: 'B', span: [1024, 0], locale: 'B/s' },
  { key: 'KB', span: [1024, 1], locale: 'KB/s' },
  { key: 'MB', span: [1024, 2], locale: 'MB/s' },
  { key: 'GB', span: [1024, 3], locale: 'GB/s' },
  { key: 'TB', span: [1024, 4], locale: 'TB/s' },
];

export const capacityUnitMapping = [
  { key: 'B', time: [1024, 0], locale: 'B' },
  { key: 'KB', time: [1024, 1], locale: 'MB' },
  { key: 'MB', time: [1024, 2], locale: 'MB' },
  { key: 'GB', time: [1024, 3], locale: 'GB' },
  { key: 'TB', time: [1024, 4], locale: 'TB' },
  { key: 'PB', time: [1024, 5], locale: 'TB' },
];
