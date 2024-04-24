// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 性能图表数据 http://10.128.136.35/dsm/perf/?monitor_db=host&monitor_obj=wz-182&cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84&monitor_item=cpu_usage,mem_usage&time_from=1629450941&time_till=1629454541 GET /dsm/perf/ */
export async function dsmPerfGet(
  params?: {
    // query
    /** 必选项，确定监控对象类型,目前支持[cluster,host,disk,pool,storage_unit] */
    monitor_db: string;
    /** 必选项，集群uuid，确定确定监控对象类型所属集群 */
    cluster_id: string;
    /** 数据是否用于dashboard */
    is_dashboard?: boolean;
    /** 两个数据之间的间隔 */
    inteval?: number;
    /** 可选项，当监控对象类型是集群时，该项可为空；当监控对象类型是其他时， 该项为具体监控对象名字。比如：监控对象是主机时，该项为具体主机名字，监控项对象是storage_unit时，该项为具体storage_unit名字 */
    monitor_obj?: string;
    monitor_item?: string;
    /** 必选项，获取性能数据的起始时间，时间戳 */
    time_from: string;
    /** 必选项，获取性能数据的截至时间，时间戳 */
    time_till: string;
    /** 可选项，如上表所示，只有当监控对象类型为磁盘时，该选项才需要填写磁盘对应的主机名字，以便确定是哪个主机上的磁盘 */
    server_name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.PerformanceData & API.RequestExtend>('/dsm/perf/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 集群性能图表数据 http://127.0.0.1/dsm/perf/cluster/?monitor_db=cluster&time_from=0&time_till=1640152260&monitor_item=riops,wiops,recover_iops,rbw,wbw,recover_bw&cluster_id=44d8c52a-6225-11ec-b70c-66f4c6d99e84&interval=90 GET /dsm/perf/cluster/ */
export async function dsmPerfClusterGet(
  params?: {
    // query
    /** 必选项，确定监控对象类型,目前支持[cluster] */
    monitor_db: string;
    /** 必选项，集群uuid，确定确定监控对象类型所属集群 */
    cluster_id: string;
    /** 单位为秒,实时:90;一天:360;一周:2520;一个月按照30天算:10800 */
    interval: number;
    monitor_item?: string;
    /** 必选项，获取性能数据的起始时间，时间戳 */
    time_from: string;
    /** 必选项，获取性能数据的截至时间，时间戳 */
    time_till: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.PerformanceData & API.RequestExtend>('/dsm/perf/cluster/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
