export type TimeLineDataType = {
  time: string | undefined;
  [key: string | 'iops' | 'bw' | 'riops' | 'wiops' | 'rbw' | 'wbw' | 'r_await' | 'w_await']: number; // iops|riops|wiops|rwb|bw 等等
};

export declare type RequestData<T> = {
  data: T[] | undefined;
  success?: boolean;
  total?: number;
} & Record<string, any>;

export type formattedDataType = {
  items: TimeLineDataType[];
  client_num?: any;
  length?: number;
};

export type parentProps = {
  width: string;
  // 卡片名称
  title: string;
  // 图例，tooltip展示是否需要格式带单位
  formatter?: boolean | ((params) => any) | undefined;
  // 请求参数
  requestConfig: {
    type: 'fetchDefaultPerf' | 'fetchDirQosPerf' | 'fetchNicPerf';
    queryParams: (
      query: TimeInfoType & {
        dependParams:
          | Partial<DefaultPerfQueryParams>
          | Partial<DirQosPerfQueryParams>
          | Partial<NicQueryParams>;
      },
    ) => DefaultPerfQueryParams | DirQosPerfQueryParams | NicQueryParams;
    dependency?: { [key: string]: any } | undefined;
  };
  // 一个chart的几条线
  lines?: {
    key: string;
    title?: any;
    chartType?: 'percent' | string;
    // legend定制，应用于echart setOption。value覆写，当图例值处理不同于性能数据时使用format
    legend?: { value?: number | undefined; format?: (val) => any };
    markLine?: { value: string | number; lineColor?: string };
  }[]; // 多条线设置，部分需要设置特殊字段
  // legend定制化，应用于DOM组件，echart setOption不再生效
  formatLegend?: boolean | ((data: TimeLineDataType[]) => any) | undefined;
  // false隐藏，undefined使用默认formatter，函数覆写默认formatter
  formatTooltip?: boolean | ((params: any, formattedData?: formattedDataType) => any) | undefined;
};

export type perfRequestType = (any) => any;

export type TimeInfoType = {
  time_from: string;
  time_till: string;
};

export type DefaultPerfQueryParams = {
  time_from: string;
  time_till: string;
  monitor_db: string;
  monitor_obj: string;
  monitor_item?: string;
};

export type DirQosPerfQueryParams = {
  time_from: string;
  time_till: string;
  monitor_item: string;
  dir_name: string;
  father_path: string;
};

export type NicQueryParams = {
  time_from: string;
  time_till: string;
  host_id: strng;
  net_card: string;
  items: string; // 'down_bandwidth,up_bandwidth'
};

export type RepNodePerfQueryParams = {
  rep_cluster_id: string;
  duration: number;
  node_name: string;
};

export type PerfHookDependency = readonly any[]; // 单页面采用数组做依赖项，单页面不同request, 采用mapping形式，逻辑需要场景开发者自己添加
