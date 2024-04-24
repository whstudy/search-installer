// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 主面板集群容量使用信息 http://127.0.0.1/dsm/dashboard/cluster_capacity/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/cluster_capacity/ */
export async function dsmDashboardClusterCapacityGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardCluster & API.RequestExtend>('/dsm/dashboard/cluster_capacity/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板存储池状态信息 http://127.0.0.1/dsm/dashboard/pool_status/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/pool_status/ */
export async function dsmDashboardPoolStatusGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardPool & API.RequestExtend>('/dsm/dashboard/pool_status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板磁盘状态信息 http://127.0.0.1/dsm/dashboard/disk_status/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/disk_status/ */
export async function dsmDashboardDiskStatusGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardDisk & API.RequestExtend>('/dsm/dashboard/disk_status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板告警信息 http://127.0.0.1/dsm/dashboard/alert_status/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/alert_status/ */
export async function dsmDashboardAlertStatusGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardAlert & API.RequestExtend>('/dsm/dashboard/alert_status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板服务器状况信息 http://127.0.0.1/dsm/dashboard/host_status/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/host_status/ */
export async function dsmDashboardHostStatusGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardHost & API.RequestExtend>('/dsm/dashboard/host_status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板集群服务状态信息 http://127.0.0.1/dsm/dashboard/cluster_status/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/cluster_status/ */
export async function dsmDashboardClusterStatusGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardClusterStaus & API.RequestExtend>('/dsm/dashboard/cluster_status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板目录快照信息 http://127.0.0.1/dsm/dashboard/snapshots_num/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/snapshots_num/ */
export async function dsmDashboardSnapshotsNumGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardSnap & API.RequestExtend>('/dsm/dashboard/snapshots_num/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板客户端组信息 包含nfs cifs ftp http://127.0.0.1/dsm/dashboard/clients/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/clients/ */
export async function dsmDashboardClientsGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardClient & API.RequestExtend>('/dsm/dashboard/clients/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板数据盘和系统盘容量信息 http://127.0.0.1/dsm/dashboard/disk_capacity/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/disk_capacity/ */
export async function dsmDashboardDiskCapacityGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardDiskCapacity & API.RequestExtend>('/dsm/dashboard/disk_capacity/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板共享目录数量信息 http://127.0.0.1/dsm/dashboard/shared_dir/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/shared_dir/ */
export async function dsmDashboardSharedDirGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardSharedDir & API.RequestExtend>('/dsm/dashboard/shared_dir/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板对象桶数量信息 http://127.0.0.1/dsm/dashboard/bucket_num/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/bucket_num/ */
export async function dsmDashboardBucketNumGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardBucket & API.RequestExtend>('/dsm/dashboard/bucket_num/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板对象top统计 http://127.0.0.1/dsm/dashboard/top_obj_usage/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/top_obj_usage/ */
export async function dsmDashboardTopObjUsageGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardTopObj & API.RequestExtend>('/dsm/dashboard/top_obj_usage/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板系统磁盘列表信息 http://127.0.0.1/dsm/dashboard/system_disk/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/system_disk/ */
export async function dsmDashboardSystemDiskGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 系统盘使用容量状态  {"status":"major/minor/info"} */
    filters: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardSystemDisk & API.RequestExtend>('/dsm/dashboard/system_disk/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板磁盘列表信息 http://127.0.0.1/dsm/dashboard/disk_list/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/disk_list/ */
export async function dsmDashboardDiskListGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 物理盘状态 可取值 1："health", 2："error", 3："sub_health" */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 要排序的字段 */
    sort_field?: string;
    /** 排序规则正序倒序,asc,desc */
    sort_rule?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardDiskList & API.RequestExtend>('/dsm/dashboard/disk_list/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板资源组容量使用率 http://127.0.0.1/dsm/dashboard/top_res_group_cap/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/top_res_group_cap/ */
export async function dsmDashboardTopResGroupCapGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardresgroup & API.RequestExtend>('/dsm/dashboard/top_res_group_cap/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 主面板存储池容量使用率 http://127.0.0.1/dsm/dashboard/top_pool_cap/?cluster_id=fba40d64-d977-11eb-ba16-66f4c6d99e84 GET /dsm/dashboard/top_pool_cap/ */
export async function dsmDashboardTopPoolCapGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dashboardpooltop & API.RequestExtend>('/dsm/dashboard/top_pool_cap/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
