import { getIntl } from 'umi';
import _ from 'lodash';
import moment from 'moment';
import { formattedDataType, TimeLineDataType } from './data';

export const timeEnum = {
  timely: 60 * 60,
  daily: 24 * 60 * 60,
  weekly: 7 * 24 * 60 * 60,
  monthly: 30 * 24 * 60 * 60,
};

export const menuTimeList = [
  {
    label: getIntl().formatMessage({ id: 'charts.legend.timely', defaultMessage: '实时' }),
    value: timeEnum.timely,
  },
  {
    label: getIntl().formatMessage({ id: 'charts.legend.daily', defaultMessage: '一天' }),
    value: timeEnum.daily,
  },
  {
    label: getIntl().formatMessage({ id: 'charts.legend.weekly', defaultMessage: '一周' }),
    value: timeEnum.weekly,
  },
  {
    label: getIntl().formatMessage({ id: 'charts.legend.monthly', defaultMessage: '一月' }),
    value: timeEnum.monthly,
  },
];

// 默认折线图样式
export const seriesStyle = [
  {
    type: 'line',
    smooth: true,
    symbol: 'none',
    itemStyle: { color: 'rgb(42, 104, 191)' },
    lineStyle: { color: 'rgb(42, 104, 191)' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(42, 104, 191, 0.3)', // 0% 处的颜色
          },
          {
            offset: 0.3,
            color: 'rgba(42, 104, 191, 0.2)', // 100% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(42, 104, 191, 0)', // 100% 处的颜色
          },
        ],
      },
    },
  },
  {
    type: 'line',
    smooth: true,
    symbol: 'none',
    itemStyle: { color: 'rgb(114, 43, 144)' },
    lineStyle: { color: 'rgb(114, 43, 144)' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(114, 43, 144, 0.3)', // 0% 处的颜色
          },
          {
            offset: 0.3,
            color: 'rgba(114, 43, 144, 0.2)', // 100% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(114, 43, 144, 0)', // 100% 处的颜色
          },
        ],
      },
    },
  },
  {
    type: 'line',
    smooth: true,
    symbol: 'none',
    itemStyle: { color: 'rgb(46, 81, 130)' },
    lineStyle: { color: 'rgb(46, 81, 130)' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(46, 81, 130, 0.3)', // 0% 处的颜色
          },
          {
            offset: 0.3,
            color: 'rgba(46, 81, 130, 0.2)', // 100% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(46, 81, 130, 0)', // 100% 处的颜色
          },
        ],
      },
    },
  },
];

export const baseChartOption = () => {
  return {
    grid: {
      left: '1%',
      // width: '100%',
      bottom: '10%',
      containLabel: true,
      show: 'true',
      borderWidth: '0',
    },
    legend: {
      itemGap: 30,
      itemWidth: 10,
      itemHeight: 10,
      left: '-4',
      selectorLabel: {
        distance: 10,
      },
      icon: 'rect',
      borderRadius: 5,
      textStyle: {
        fontSize: 14,
        rich: {
          b: {
            fontSize: 14,
            verticalAlign: 'top',
            padding: [0, 0, 22, 0],
            color: ' rgba(0, 0, 0, 0.85)',
          },
          a: {
            fontSize: 14,
            align: 'left',
            padding: [0, 0, 10, -18],
            color: ' rgba(0, 0, 0, 0.85)',
            fontWeight: '600',
          },
        },
      },
    },
    dataZoom: {
      type: 'slider',
      xAxisIndex: 0,
      height: 18,
      bottom: 5,
      start: 0,
      end: 100,
      showDetail: false,
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel: {
        showMinLabel: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(128,134,149,1)',
        fontSize: '10',
      },
      min: 0,
    },
    series: [],
  };
};

export function getMarkLineOptions({ markLineData, isIntegerType, dataFormat }) {
  const { value, lineColor } = markLineData || {};
  return {
    grid: { right: '10%' },
    xAxis: {
      type: 'category',
      axisLabel: {
        showMinLabel: true,
        color: 'rgba(128,134,149,1)',
        fontSize: '12',
        interval: 'auto',
        show: true,
        formatter: function (times, index) {
          if (index % 2 != 0) {
            return '\n\n' + moment(times).format('MM-DD HH:mm');
          } else {
            return moment(times).format('MM-DD HH:mm');
          }
        },
      },
    },
    yAxis: {
      max: function ({ max }) {
        let newMax = isNaN(max) ? 0 : max;
        if (value) {
          newMax = Math.max(newMax, value);
        }
        newMax = newMax * 1.1;
        if (isIntegerType) {
          newMax = Math.ceil(newMax);
        } else {
          newMax = newMax % 1 ? newMax.toFixed(1) : newMax;
        }
        return newMax;
      },
      splitNumber: isIntegerType && value < 4 ? 1 : null,
    },
    series: [
      {
        markLine: {
          symbol: 'none',
          lineStyle: {
            color: lineColor ?? '#F2AF00',
            width: 2,
            type: 'solid',
          },
          label: {
            position: 'middle',
            formatter: isIntegerType
              ? value
              : (params) => {
                  return dataFormat(params?.value ?? 0);
                },
          },
          data: [
            {
              type: 'max',
              yAxis: value,
            },
          ],
        },
      },
    ],
  };
}

/**
 * 处理取值字段不同的情况
 * @param val response data
 * @param linesType 折线的key，与接口返回对应
 * @returns [{time, mem, cpu}]
 */
export const formatPerformanceData = (resData, lines): formattedDataType => {
  const linesType = lines?.map((v) => v?.key)?.filter((v) => v !== 'markline');
  const formatData = [];
  if ('items' in resData) {
    resData?.items?.forEach((data, index) => {
      const metricData = {};
      linesType.forEach((key) => {
        metricData[key] = _.floor(data?.[key] ?? 0);
      });
      formatData.push({
        time: data.time,
        ...metricData,
      });
    });
  } else {
    const baseData = resData?.[linesType?.[0]]; // 时间序列
    baseData?.forEach((data, index) => {
      const metricData = {};
      linesType.forEach((key) => {
        metricData[key] = _.floor(resData[key][index]?.[key] ?? resData[key][index]?.mean ?? 0);
      });
      formatData.push({
        time: data.time,
        ...metricData,
      });
    });
  }
  return {
    items: formatData,
    client_num: resData?.client_num ?? [],
    length: resData?.length ?? 0,
    total_num: resData?.total_num ?? 0,
  };
};
