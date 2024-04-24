// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 逻辑视图按存储查找已共享目录 http://127.0.0.1/dsm/logic/dir/?pool_name=data GET /dsm/logic/dir/ */
export async function dsmLogicDirGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 存储池名称 */
    pool_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.LogicDir & API.RequestExtend>('/dsm/logic/dir/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 逻辑视图查看目录详情 http://127.0.0.1/dsm/logic/dir_info/?dir_name=test&father_path=/ GET /dsm/logic/dir_info/ */
export async function dsmLogicDirInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 目录名称 */
    dir_name: string;
    /** 父路径 */
    father_path: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.logicdirinfo & API.RequestExtend>('/dsm/logic/dir_info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 逻辑视图查看目录详情 http://127.0.0.1/dsm/logic/node_info/?cluster_id=1bd39738-92ca-11ec-b634-5254005613a6&host_id=1 GET /dsm/logic/node_info/ */
export async function dsmLogicNodeInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 主机id */
    host_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.LogicNodeInfo & API.RequestExtend>('/dsm/logic/node_info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 逻辑视图查询桶 http://127.0.0.1/dsm/logic/bucket/?pool_name=rgw_data GET /dsm/logic/bucket/ */
export async function dsmLogicBucketGet(
  params?: {
    // query
    /** 存储池名称 */
    pool_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.LogicBucketList & API.RequestExtend>('/dsm/logic/bucket/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
