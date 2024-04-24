// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查看磁盘 http://127.0.0.1/dsm/disk/?host_id=3&cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/disk/ */
export async function dsmDiskGet(
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
  return request<API.showHostDiskInfo & API.RequestExtend>('/dsm/disk/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看空闲磁盘 http://127.0.0.1/dsm/disk/free_disk/?server_id=3&cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/disk/free_disk/ */
export async function dsmDiskFreeDiskGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 节点ID */
    host_id?: number;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.showHostDiskInfo & API.RequestExtend>('/dsm/disk/free_disk/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 数据盘状态统计 http://127.0.0.1/dsm/disk/data_disk_status/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/disk/data_disk_status/ */
export async function dsmDiskDataDiskStatusGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.dataDiskStatus & API.RequestExtend>('/dsm/disk/data_disk_status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 移除磁盘 http://127.0.0.1/dsm/disk/delete_disk/ POST /dsm/disk/delete_disk/ */
export async function dsmDiskDeleteDisk(
  body: {
    /** 集群ID */
    cluster_id: string;
    sn_list: any[];
    /** 主机名字和磁盘名字组合,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delDisk & API.RequestExtend>('/dsm/disk/delete_disk/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 加载磁盘 http://127.0.0.1/dsm/disk/load_disk/ POST /dsm/disk/load_disk/ */
export async function dsmDiskLoadDisk(
  body: {
    /** 集群ID */
    cluster_id: string;
    disks_id: any[];
    /** 主机名字和磁盘名字组合,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.loadDisk & API.RequestExtend>('/dsm/disk/load_disk/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 磁盘点灯 http://127.0.0.1/dsm/disk/operate_position_light/ POST /dsm/disk/operate_position_light/ */
export async function dsmDiskOperatePositionLight(
  body: {
    /** 集群ID */
    cluster_id: string;
    sn_number: number;
    /** 对硬盘定位灯的操作，开启或关闭 */
    operation: string;
    /** 主机名字和磁盘名字组合,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.lightDisk & API.RequestExtend>('/dsm/disk/operate_position_light/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发现磁盘 http://127.0.0.1/dsm/disk/update_disk/ POST /dsm/disk/update_disk/ */
export async function dsmDiskUpdateDisk(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 节点名字 */
    node_name: string;
    /** 主机名字,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/disk/update_disk/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
