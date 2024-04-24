// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取资源组列表 http://127.0.0.1/dsm/storage/group/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/storage/group/ */
export async function dsmStorageGroupGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 排序字段 */
    sort_field?: string;
    /** 排序规则 */
    sort_rule?: string;
    /** 用于筛选的关键字 */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    fuzzy?: string;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryResourceGroup & API.RequestExtend>('/dsm/storage/group/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建资源组 http://127.0.0.1/dsm/storage/group/ POST /dsm/storage/group/ */
export async function dsmStorageGroup(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 资源组名称 */
    name: string;
    /** 资源组使用磁盘类型 HDD/SSD/NVME */
    disk_type: string;
    /** 故障域 osd/host/rack */
    leaf_firstn: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/storage/group/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置资源组qos http://127.0.0.1/dsm/storage/group/set_qos/ POST /dsm/storage/group/set_qos/ */
export async function dsmStorageGroupSetQos(
  body: {
    /** 资源组名称 */
    name: string;
    /** 资源组qos策略，1.业务优先、2.恢复优先、3.自定义 */
    qos_strategy: number;
    /** 数据恢复带宽 */
    bandwidth: number;
    /** 数据恢复iops */
    iops: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/storage/group/set_qos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询资源组qos http://127.0.0.1/dsm/storage/group/get_qos/?name=tfs GET /dsm/storage/group/get_qos/ */
export async function dsmStorageGroupGetQosGet(
  params?: {
    // query
    /** 资源组名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ResourceGroupQosResponse & API.RequestExtend>('/dsm/storage/group/get_qos/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取资源组storage_unit详情 http://127.0.0.1/dsm/storage/group/storage_unit_info/ GET /dsm/storage/group/storage_unit_info/ */
export async function dsmStorageGroupStorageUnitInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 资源组id */
    group_id: number;
    /** 模糊查询的字段,此处为node */
    fuzzy?: string;
    /** 模糊查询的值 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryResourceGroupStorageUnitInfo & API.RequestExtend>(
    '/dsm/storage/group/storage_unit_info/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除资源组 http://127.0.0.1/dsm/storage/group/delete/ POST /dsm/storage/group/delete/ */
export async function dsmStorageGroupDelete(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 资源组id */
    group_id: number;
    /** 资源组的名字,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delResourceGroup & API.RequestExtend>('/dsm/storage/group/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 资源组存储单元移动 http://127.0.0.1/dsm/storage/group/move/ POST /dsm/storage/group/move/ */
export async function dsmStorageGroupMove(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 表明移动对象为主机还是存储单元，主机传host，存储单元传storage_unit */
    object_type: string;
    /** 存储单元id列表或者主机id列表，如果object_type为主机则传主机id列表；如果object_type为存储单元则传存储单元id列表 */
    object_ids: number[];
    /** 想要移动至的目标资源组id */
    target_group_id: number;
    /** 将要移动的对象目前所在的资源组id */
    source_group_id: number;
    /** 存储单元的名字,用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.moveOSD & API.RequestExtend>('/dsm/storage/group/move/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
