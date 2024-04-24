// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 性能图表数据 http://10.128.129.100/dsm/dir_qos/perf/?time_from=1638496853&time_till=1638499853&cluster_id=78a8627a-50e1-11ec-81f3-e6c08b5ba562&dir_name=dir2&father_path=/&monitor_db=dir_qos&monitor_item=bandwidth,client_num GET /dsm/dir_qos/perf/ */
export async function dsmDirQosPerfGet(
  params?: {
    // query
    /** 必选项，确定监控对象类型,目前支持 dir_ops  */
    monitor_db: string;
    /** 必选项，集群uuid，确定确定监控对象类型所属集群 */
    cluster_id: string;
    /** 必选项，目录名称 */
    dir_name: string;
    /** 必选项，父级目录名称 */
    father_path: string;
    /** 必选项，监控对象和可选items如下表所示  */
    monitor_item: string;
    /** 必选项，获取性能数据的起始时间，时间戳 */
    time_from: string;
    /** 必选项，获取性能数据的截至时间，时间戳 */
    time_till: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.PerformanceDirQos & API.RequestExtend>('/dsm/dir_qos/perf/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询一个目录qos的带宽和iops http://127.0.0.1/dsm/dir_qos/get_one_qos/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&father_path=/&dir_name=aaa GET /dsm/dir_qos/get_one_qos/ */
export async function dsmDirQosGetOneQosGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 父级目录路径 */
    father_path: string;
    /** 子级目录路径 */
    dir_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.DirQosData & API.RequestExtend>('/dsm/dir_qos/get_one_qos/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置目录最大iop或者带宽 http://127.0.0.1/dsm/dir_qos/ POST /dsm/dir_qos/ */
export async function dsmDirQos(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 父级目录 */
    father_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 目录最大iops的值 */
    iops_limit: number;
    /** 目录最大带宽的值 */
    bandwidth_limit: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.dirqos & API.RequestExtend>('/dsm/dir_qos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除目录iops或者带宽 http://127.0.0.1/dsm/dir_qos/delete/ POST /dsm/dir_qos/delete/ */
export async function dsmDirQosDelete(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 目录名称 */
    dir_name: string;
    /** 父级目录 */
    father_path: string;
    /** 取消iops dir qos */
    iops_limit: number;
    /** 取消dir qos带宽设置 */
    bandwidth_limit: number;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dirqos & API.RequestExtend>('/dsm/dir_qos/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
