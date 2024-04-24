import { useIntl } from 'umi';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Select } from 'antd';
import ProCard from '@ant-design/pro-card';
import _ from 'lodash';
import {
  formatPerformanceData,
  baseChartOption,
  menuTimeList,
  seriesStyle,
  timeEnum,
  getMarkLineOptions,
} from './utils';
import { formattedDataType, parentProps, perfRequestType } from './data';
import { useDebounceFn } from 'ahooks';
import useFetchPerfData from './useFetchPerfData';

const INTEGER_TYPE_LINE = ['iops', 'riops', 'wiops', 'r_await', 'w_await'];

const LocalePrefix = 'component.baseEChart.';
const BasicLineChart: React.FC<parentProps> = ({
  width,
  requestConfig = {},
  formatter = false,
  title,
  lines,
  formatLegend,
  formatTooltip,
}) => {
  const chartRef = useRef<any>();
  const intl = useIntl();
  const [currentTime, setCurrentTime] = useState<number>(timeEnum.timely);
  const [data, setData] = useState<formattedDataType>();
  const [definedLegend, setDefinedLegend] = useState(false);
  const perfRequests = useFetchPerfData();
  const timeRef = useRef();

  // 个别通用设置可以放在某个lines[n]中
  const isIntegerType = INTEGER_TYPE_LINE?.includes(lines?.[0]?.key); // 判断数据是个数还是带单位的
  const { type, queryParams, dependency } = requestConfig || {};
  const request: perfRequestType = perfRequests?.[type as string];
  const dataFormat = (val) => {
    return typeof formatter === 'function' ? formatter(val) : val;
  };
  let chartType;
  let markLineData;
  lines?.forEach((v) => {
    if ('markLine' in v) {
      markLineData = v?.markLine;
    }
    if ('chartType' in v) {
      chartType = v?.chartType;
    }
  });

  const { run: debounceRun } = useDebounceFn((func) => func?.(), { wait: 10 });

  /**
   * 格式化图表中 tooltip 的样式
   * @param params
   * @returns
   */
  function tooltipFormatter(params, formattedData) {
    if (formatTooltip && typeof formatTooltip === 'function') {
      return formatTooltip(params, formattedData);
    }
    let tooltip = '';
    tooltip += moment(params?.[0]?.axisValueLabel).format('YYYY-MM-DD HH:mm:ss');
    params?.map((ele, i) => {
      const itemSeriesName = ele?.seriesName;
      const lineItem = _.find(lines, (v) => v?.key === itemSeriesName);
      const dataName =
        lineItem?.title || intl.formatMessage({ id: `${LocalePrefix}${itemSeriesName}` });
      tooltip += '<br/>';
      tooltip +=
        params?.[i]?.marker + dataName + ': ' + `${dataFormat(ele?.data?.[itemSeriesName])}`;
    });
    return tooltip;
  }

  /**
   * 设置标线(目前仅支持一条，封在series[0]中，如多条标线，单独修改该处逻辑即可)
   * @param type  lines[key]
   * @returns {[key:string]:any}
   */
  function setMarkLine() {
    if (markLineData === undefined || markLineData?.value === undefined) {
      return {};
    }
    return getMarkLineOptions({ markLineData, isIntegerType, dataFormat });
  }

  /**
   * 格式化性能数据 [{time, iops/bw}]
   * 处理图表的option
   * @param val  接口返回值
   */
  const formatOptions = (formattedData: formattedDataType) => {
    const lineData = formattedData?.items;
    const minTime = moment(timeRef?.current?.time_from * 1000).format('YYYY-MM-DD HH:mm:ss');
    const maxTime = moment(timeRef?.current?.time_till * 1000).format('YYYY-MM-DD HH:mm:ss');
    return _.mergeWith(
      {
        tooltip: {
          trigger: 'axis',
          show: formatTooltip === false ? false : true,
          formatter: (params) => tooltipFormatter(params, formattedData),
        },
        legend: {
          show: formatLegend === false || typeof formatLegend === 'function' ? false : true,
          formatter: (lineType) => {
            let lastValue = lineData[lineData.length - 1]?.[lineType] ?? 0;
            let legendName = '';
            const line = _.find(lines, (v) => v?.key === lineType);
            if (line?.title) {
              legendName = line?.title;
            } else {
              legendName = intl.formatMessage({ id: `${LocalePrefix}${lineType}` });
            }
            if (typeof line?.legend?.value === 'number') {
              lastValue = line?.legend?.value as number;
            } else if (typeof line?.legend?.format === 'function') {
              return [
                `{a|${line?.legend?.format(lastValue) ?? dataFormat(lastValue)}}`,
                `{b|${legendName}}`,
              ]?.join('\n');
            }
            return [`{a|${dataFormat(lastValue)}}`, `{b|${legendName}}`]?.join('\n');
          },
        },
        dataset: {
          source: lineData ?? [],
        },
        dataZoom: { show: lineData?.length > 10 },
        xAxis: {
          min: minTime,
          max: maxTime,
          axisLabel: {
            formatter: function (params, index) {
              let timeFormat;
              if (currentTime === timeEnum.timely) {
                timeFormat = '{HH}:{mm}:{ss}';
              } else {
                timeFormat = '{MM}-{dd} {HH}:{mm}';
              }
              if (index % 2 != 0) {
                return '\n\n' + timeFormat;
              } else {
                return timeFormat;
              }
            },
          },
        },
        yAxis: {
          axisLabel: {
            formatter: (value: number) => {
              return isIntegerType ? Math.round(value) : dataFormat(value);
            },
          },
          max: ({ max }) => {
            let newMax = isNaN(max) ? 0 : max;
            newMax = newMax * 1.1;
            // 整数
            if (isIntegerType) {
              newMax = Math.ceil(newMax);
            } else {
              newMax = newMax % 1 ? newMax.toFixed(1) : newMax;
            }
            if (chartType === 'percent') {
              newMax = 100;
            }
            // 空值 y轴分割线
            if (!lineData?.length) {
              newMax = 4;
            }
            return newMax;
          },
        },
        series: lines?.map((item, index) => {
          return {
            ...seriesStyle[index],
            name: item?.key,
            encode: {
              x: 'time',
              y: item?.key,
            },
          };
        }),
      },
      setMarkLine(),
    );
  };

  /**
   * 设置chart options
   * @param lineData [{timr ,iops|bw|riops|...}]
   */
  const setChartOptions = useCallback(
    (formattedData) => {
      const lineData = formattedData?.items;
      if (formatLegend) {
        setDefinedLegend(formatLegend(lineData));
      }
      const chartOptions = formatOptions(formattedData);
      chartRef.current?.setOption(chartOptions);
    },
    [markLineData?.value, currentTime, lines],
  );

  /**
   * 切换时间、入参变更、其他操作触发等查询新的性能数据
   */
  useEffect(() => {
    let ignore = false;
    const fetchPerfData = async () => {
      const startTime = moment().startOf('minutes').toJSON();
      const timeInfo: any = {
        time_from: moment(startTime).subtract(currentTime, 'seconds').unix(),
        time_till: moment(startTime).unix(),
      };
      timeRef.current = timeInfo;
      // chartRef?.current?.showLoading();
      const res = await request?.(queryParams?.({ ...timeInfo, dependParams: dependency }));
      // chartRef?.current?.hideLoading();
      if (!ignore) {
        const formattedData = formatPerformanceData(res?.data, lines);
        setData(formattedData);
      }
    };
    const timer = setInterval(() => {
      fetchPerfData();
    }, 5000);
    debounceRun(fetchPerfData);
    return () => {
      ignore = true;
      // 清除定时器
      clearInterval(timer);
    };
  }, [currentTime, ...Object.values(dependency ?? {})]);

  useEffect(() => {
    if (data) {
      debounceRun(() => setChartOptions(data));
    }
  }, [markLineData?.value, data]);

  useEffect(() => {
    const resizeHandler = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <ProCard
      title={title ?? ''}
      style={{ width: '100%', minWidth: 370 }}
      extra={
        <Select
          defaultValue={currentTime}
          bordered={false}
          onChange={(e) => setCurrentTime(e)}
          options={menuTimeList}
        />
      }
    >
      {definedLegend ?? ''}
      {
        <ReactECharts
          style={{ height: '300px', width: width || '100%' }}
          option={baseChartOption()}
          lazyUpdate={true}
          onChartReady={(e) => {
            chartRef.current = e;
          }}
        />
      }
    </ProCard>
  );
};
export default BasicLineChart;
