// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 快照策略列表 http://127.0.0.1/dsm/snappolicy/ GET /dsm/snappolicy/ */
export async function dsmSnappolicyGet(
  params?: {
    // query
    cluster_id?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
    fuzzy?: string;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.snapshotStrategyListRespone & API.RequestExtend>('/dsm/snappolicy/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建快照策略 http://127.0.0.1/dsm/snappolicy/ POST /dsm/snappolicy/ */
export async function dsmSnappolicy(
  body: {
    /** 集群ID */
    cluster_id?: string;
    name?: string;
    /** 策略规则内容 */
    rules?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyStrategyResponse & API.RequestExtend>('/dsm/snappolicy/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑快照策略 http://127.0.0.1/dsm/snappolicy/modify/ POST /dsm/snappolicy/modify/ */
export async function dsmSnappolicyModify(
  body: {
    /** 集群ID */
    cluster_id?: string;
    name?: string;
    /** 策略规则内容 */
    rules?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyStrategyResponse & API.RequestExtend>('/dsm/snappolicy/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除快照策略 http://127.0.0.1/dsm/snappolicy/delete/ POST /dsm/snappolicy/delete/ */
export async function dsmSnappolicyDelete(
  body: {
    /** 集群ID */
    cluster_id?: string;
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/snappolicy/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
