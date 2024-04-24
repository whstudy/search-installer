// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取被收集的日志信息 http://127.0.0.1/dsm/log/ GET /dsm/log/ */
export async function dsmLogGet(options?: { [key: string]: any }) {
  return request<API.log & API.RequestExtend>('/dsm/log/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 下载日志 http://127.0.0.1/dsm/log/download/ GET /dsm/log/download/ */
export async function dsmLogDownloadGet(
  params?: {
    // query
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.logDownload & API.RequestExtend>('/dsm/log/download/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取集群收集日志前必要的信息 http://127.0.0.1/dsm/log/collection/ GET /dsm/log/collection/ */
export async function dsmLogCollectionGet(options?: { [key: string]: any }) {
  return request<API.logCollectionGet & API.RequestExtend>('/dsm/log/collection/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建收集日志任务 http://127.0.0.1/dsm/log/collection/ POST /dsm/log/collection/ */
export async function dsmLogCollection(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 操作对象名称 */
    name: string;
    /** 指定收集时间范围的起始时间 */
    start_time: number;
    /** 指定收集时间范围的终止时间 */
    end_time: number;
    resource: { node?: Record<string, any>; other?: Record<string, any> };
  },
  options?: { [key: string]: any },
) {
  return request<API.logCollectionPost & API.RequestExtend>('/dsm/log/collection/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消收集日志 http://127.0.0.1/dsm/log/collection/cancel/ POST /dsm/log/collection/cancel/ */
export async function dsmLogCollectionCancel(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 收集集群配置信息任务id */
    job_id?: number;
    /** 操作对象名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.logCollectionCancel & API.RequestExtend>('/dsm/log/collection/cancel/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
