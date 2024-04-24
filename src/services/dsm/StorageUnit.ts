// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取存储单元列表 http://127.0.0.1/dsm/storage_unit/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/storage_unit/ */
export async function dsmStorageUnitGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryOSD & API.RequestExtend>('/dsm/storage_unit/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询空闲的存储单元 http://127.0.0.1/dsm/storage_unit/isolated/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/storage_unit/isolated/ */
export async function dsmStorageUnitIsolatedGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.IsolatedOSD & API.RequestExtend>('/dsm/storage_unit/isolated/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 启动存储单元 http://127.0.0.1/dsm/storage_unit/start/ POST /dsm/storage_unit/start/ */
export async function dsmStorageUnitStart(
  body: {
    /** 集群ID */
    cluster_id: string;
    storage_unit_ids: number[];
    /** 存储单元的名字,当启动多个时，使用英文逗号隔开,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.startOSD & API.RequestExtend>('/dsm/storage_unit/start/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 停止存储单元 http://127.0.0.1/dsm/storage_unit/stop/ POST /dsm/storage_unit/stop/ */
export async function dsmStorageUnitStop(
  body: {
    /** 集群ID */
    cluster_id: string;
    storage_unit_ids: number[];
    /** 存储单元的名字,当停止多个时,使用英文逗号隔开,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.startOSD & API.RequestExtend>('/dsm/storage_unit/stop/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除存储单元 POST /dsm/storage_unit/delete/ */
export async function dsmStorageUnitDelete(
  body: {
    /** cluster id 必填 */
    cluster_id?: string;
    storage_unit_ids?: any[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; data?: Record<string, any>; msg?: string } & API.RequestExtend>(
    '/dsm/storage_unit/delete/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 新物理磁盘替换故障存储单元 POST /dsm/storage_unit/replace/ */
export async function dsmStorageUnitReplace(
  body: {
    /** cluster id 必填 */
    cluster_id?: string;
    storage_unit_id?: number;
    disk_id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; data?: Record<string, any>; msg?: string } & API.RequestExtend>(
    '/dsm/storage_unit/replace/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
