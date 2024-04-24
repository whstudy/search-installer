// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取快照 http://127.0.0.1/dsm/dir/get_snapshots/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10&full_path=/ GET /dsm/dir/snapshot/ */
export async function dsmDirSnapshotGet(
  params?: {
    // query
    cluster_id?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
    /** 目录路径 */
    full_path: string;
    /** 开始时间 */
    start_time?: number;
    /** 结束时间 */
    end_time?: number;
    /**  快照类型 */
    mode?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetSnapshotData & API.RequestExtend>('/dsm/dir/snapshot/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加快照 http://127.0.0.1/dsm/dir/snapshot/ POST /dsm/dir/snapshot/ */
export async function dsmDirSnapshot(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 要做快照的目录路径 */
    full_path: string;
    /** 快照名字 */
    snapshot_name: string;
    /** 快照描述 */
    description?: string;
    /** 快照名称,操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createSnap & API.RequestExtend>('/dsm/dir/snapshot/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除快照 http://127.0.0.1/dsm/dir/snapshot/delete/ POST /dsm/dir/snapshot/delete/ */
export async function dsmDirSnapshotDelete(
  body: {
    /** 集群ID */
    cluster_id: string;
    snapshot_id: number[];
    /** 快照inode_id */
    inode_id: string;
    /** 快照名称,删除多个时,使用英文逗号隔开,操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delSnap & API.RequestExtend>('/dsm/dir/snapshot/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 快照回滚 http://127.0.0.1/dsm/dir/snapshot/restore/ POST /dsm/dir/snapshot/restore/ */
export async function dsmDirSnapshotRestore(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 快照ID */
    snapshot_id: number;
    /** 目录全路径 */
    full_path: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SnapshotRollback & API.RequestExtend>('/dsm/dir/snapshot/restore/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询定时快照策略 http://127.0.0.1/dsm/snap_policy_config/?preindex=1&sufindex=10&cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&father_path=/&dir_name=dir GET /dsm/dir/snap_policy_config/ */
export async function dsmDirSnapPolicyConfigGet(
  params?: {
    // query
    cluster_id?: string;
    /** 目录父路径 */
    parent_path: string;
    /** 当前目录名 */
    dir_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryDirSnapPolicy & API.RequestExtend>('/dsm/dir/snap_policy_config/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建定时快照策略 http://127.0.0.1/dsm/dir/create_snap_policy_config/ POST /dsm/dir/create_snap_policy_config/ */
export async function dsmDirCreateSnapPolicyConfig(
  body: API.dirSnapPolicyRequestBody,
  options?: { [key: string]: any },
) {
  return request<API.defaultResponseNoData & API.RequestExtend>(
    '/dsm/dir/create_snap_policy_config/',
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

/** 编辑定时快照配置 http://127.0.0.1/dsm/dir/modify_snap_policy_config/ POST /dsm/dir/modify_snap_policy_config/ */
export async function dsmDirModifySnapPolicyConfig(
  body: API.dirSnapPolicyRequestBody,
  options?: { [key: string]: any },
) {
  return request<API.defaultResponseNoData & API.RequestExtend>(
    '/dsm/dir/modify_snap_policy_config/',
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

/** 删除定时快照配置 http://127.0.0.1/dsm/dir/delete_snap_policy_config/ POST /dsm/dir/delete_snap_policy_config/ */
export async function dsmDirDeleteSnapPolicyConfig(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 父路径 */
    parent_path: string;
    /** 目录名称 */
    dir_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.defaultResponseNoData & API.RequestExtend>(
    '/dsm/dir/delete_snap_policy_config/',
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
