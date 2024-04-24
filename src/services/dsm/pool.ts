// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 存储池修改用途 http://127.0.0.1/dsm/storage/pool/update_purpose/ POST /dsm/storage/pool/update_purpose/ */
export async function dsmStoragePoolUpdatePurpose(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 存储池名称 */
    name: string;
    /** 存储池用途 */
    purpose: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.defaultResponseNoData & API.RequestExtend>(
    '/dsm/storage/pool/update_purpose/',
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

/** 获取存储池列表 http://127.0.0.1/dsm/storage/pool/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/storage/pool/ */
export async function dsmStoragePoolGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 用于筛选的关键字 */
    keyword?: string;
    /** 排序字段 */
    sort_field?: string;
    /** 正序或倒序 */
    sort_rule?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选存储池健康状态 */
    status?: number;
    /** 用于筛选存储池:副本or纠删 */
    safe_type?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryPool & API.RequestExtend>('/dsm/storage/pool/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建存储池 http://127.0.0.1/dsm/storage/pool/ POST /dsm/storage/pool/ */
export async function dsmStoragePool(
  body: {
    /** 获取ID */
    cluster_id: string;
    /** 资源组id */
    res_group_id: number;
    /** 存储池名称 */
    pool_name: string;
    /** 用于操作记录 */
    name: string;
    /** 安全策略为副本时(此时必传),副本数 */
    size: number;
    /** 存储池最大可用容量 */
    quota_bytes: number;
    /** 安全策略为副本时(此时必传),最小副本数 */
    min_size?: number;
    /** 存储池类型：EC或副本 */
    safe_type: number;
    /** 安全策略为纠删时(此时必传),数据块数 */
    data_block_num?: number;
    /** 安全策略为纠删时(此时必传),校验块数 */
    code_block_num?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.createPool & API.RequestExtend>('/dsm/storage/pool/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取EC存储池推荐配置 http://127.0.0.1/dsm/storage/pool/recommend/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&res_group_id=-1 GET /dsm/storage/pool/recommend/ */
export async function dsmStoragePoolRecommendGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 创建存储池时选定的资源组ID */
    res_group_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryPoolRecommend & API.RequestExtend>('/dsm/storage/pool/recommend/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改存储池 http://127.0.0.1/dsm/storage/pool/modify/ POST /dsm/storage/pool/modify/ */
export async function dsmStoragePoolModify(
  body: {
    /** 集群ID */
    cluster_id?: string;
    /** 存储池的名字 */
    name?: string;
    /** 配额大小 */
    quota_bytes?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; data?: any; msg?: string } & API.RequestExtend>(
    '/dsm/storage/pool/modify/',
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

/** 删除存储池 http://127.0.0.1/dsm/storage/pool/delete/ POST /dsm/storage/pool/delete/ */
export async function dsmStoragePoolDelete(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 存储池ID */
    pool_id: number;
    /** 存储池的名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delPool & API.RequestExtend>('/dsm/storage/pool/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看存储池相关信息数量 http://127.0.0.1/ui/summary/poolsummary/ GET /ui/summary/poolsummary/ */
export async function uiSummaryPoolsummaryGet(options?: { [key: string]: any }) {
  return request<API.poolSummary & API.RequestExtend>('/ui/summary/poolsummary/', {
    method: 'GET',
    ...(options || {}),
  });
}
