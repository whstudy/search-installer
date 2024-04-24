// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取集群列表 http://127.0.0.1/dsm/clusters/get_clusters/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/clusters/get_clusters/ */
export async function dsmClustersGetClustersGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryCluster & API.RequestExtend>('/dsm/clusters/get_clusters/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取向导默认配置 http://127.0.0.1/dsm/clusters/get_defaultInfo/ GET /dsm/clusters/get_defaultInfo/ */
export async function dsmClustersGetDefaultInfoGet(options?: { [key: string]: any }) {
  return request<API.defaultInfo & API.RequestExtend>('/dsm/clusters/get_defaultInfo/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 集群下电 http://127.0.0.1/dsm/clusters/power_down/ POST /dsm/clusters/power_down/ */
export async function dsmClustersPowerDown(
  body: {
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.powerDownInfo & API.RequestExtend>('/dsm/clusters/power_down/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改向导默认信息 http://127.0.0.1/dsm/clusters/update_defaultInfo/ POST /dsm/clusters/update_defaultInfo/ */
export async function dsmClustersUpdateDefaultInfo(
  body: {
    /** 默认存储池 */
    default_pool: string;
    /** 默认用户组 */
    default_group: string;
    /** 默认用户 */
    default_user: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.postExa & API.RequestExtend>('/dsm/clusters/update_defaultInfo/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改集群 http://127.0.0.1/dsm/clusters/update_cluster/ POST /dsm/clusters/update_cluster/ */
export async function dsmClustersUpdateCluster(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 集群名称 */
    new_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.takeoverCluster & API.RequestExtend>('/dsm/clusters/update_cluster/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除集群 http://127.0.0.1/dsm/clusters/delete_cluster/ POST /dsm/clusters/delete_cluster/ */
export async function dsmClustersDeleteCluster(
  body: {
    /** 集群ID */
    cluster_id: string;
    del_clusterid: string[];
    /** 被删除集群的名字,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delCluster & API.RequestExtend>('/dsm/clusters/delete_cluster/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 纳管集群 http://127.0.0.1/dsm/clusters/cluster_takeover/ POST /dsm/clusters/cluster_takeover/ */
export async function dsmClustersClusterTakeover(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 纳管集群用户 */
    takeover_user: string;
    /** 纳管集群ip */
    takeover_ip: string;
    takeover_pass: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.takeoverCluster & API.RequestExtend>('/dsm/clusters/cluster_takeover/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 配置向导状态修改 http://127.0.0.1/dsm/clusters/update_status/ POST /dsm/clusters/update_status/ */
export async function dsmClustersUpdateStatus(
  body: {
    /** 向导状态码 */
    wizard_status: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.postExa & API.RequestExtend>('/dsm/clusters/update_status/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取集群配置信息收集记录 http://127.0.0.1/dsm/clusters/config/get_collection GET /dsm/clusters/config/get_collection/ */
export async function dsmClustersConfigGetCollectionGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.configCollectionInfo & API.RequestExtend>(
    '/dsm/clusters/config/get_collection/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 触发收集集群配置信息任务 http://127.0.0.1/dsm/clusters/config/create_collection POST /dsm/clusters/config/create_collection/ */
export async function dsmClustersConfigCreateCollection(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 操作对象名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createCollection & API.RequestExtend>(
    '/dsm/clusters/config/create_collection/',
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

/** 触发取消收集集群配置信息任务 http://127.0.0.1/dsm/clusters/config/cancel_collection POST /dsm/clusters/config/cancel_collection/ */
export async function dsmClustersConfigCancelCollection(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 收集集群配置信息任务id */
    job_id: number;
    /** 操作对象名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.configCollection & API.RequestExtend>(
    '/dsm/clusters/config/cancel_collection/',
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

/** 触发下载集群配置 http://127.0.0.1/dsm/clusters/config/create_download/ GET /dsm/clusters/config/create_download/ */
export async function dsmClustersConfigCreateDownloadGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 用户名,操作记录对象名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.configCollection & API.RequestExtend>(
    '/dsm/clusters/config/create_download/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 触发下载集群配置 http://127.0.0.1/dsm/gloabl_search/ GET /ui/global_search/ */
export async function uiGlobalSearchGet(
  params?: {
    // query
    cluster_id?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 目录名称 */
    keyword: string;
    /** 资源类型：目录，存储池，文件用户，对象用户，对象租户，文件用户组，节点，存储网关，存储策略，资源组 */
    resource_type?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GlobalSearchResult & API.RequestExtend>('/ui/global_search/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
