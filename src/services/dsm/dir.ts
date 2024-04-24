// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取共享目录 http://127.0.0.1/dsm/dir/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10&parent_path=/ GET /dsm/dir/ */
export async function dsmDirGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id?: string;
    /** 父路径 */
    parent_path?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryDir & API.RequestExtend>('/dsm/dir/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建共享目录 http://127.0.0.1/dsm/dir/ POST /dsm/dir/ */
export async function dsmDir(
  body: {
    /** 该参数是为了操作记录，记录的操作对象是全路径（父路径+目录名字） */
    name: string;
    /** 新建目录名称 */
    dir_name: string;
    /** 新建目录父路径 */
    parent_path: string;
    /** 集群ID */
    cluster_id: string;
    /** 目录属主名 */
    cer_user_name: string;
    /** 用户属组名 */
    cer_group_name: string;
    /** 是否开启快照回滚 开启or关闭 (true or false) */
    enable_restore?: boolean;
    /** 目录权限 */
    rights: string;
    /** 目录所属存储池 */
    data_pool: string;
    /** 容量配额单位 */
    byte_unit?: string;
    /** 最大容量配额 */
    max_byte?: number;
    /** 最大文件数配额 */
    max_files?: number;
    /** 最小保护周期 */
    min_protect_period?: number;
    /** 最大保护周期 */
    max_protect_period?: number;
    /** 默认保护周期 */
    default_protect_period?: number;
    /** 自动锁定时间 */
    lock_period?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.createDir & API.RequestExtend>('/dsm/dir/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 文件树 http://127.0.0.1/portal/dir/tree/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&full_path=/ GET /portal/dir/tree/ */
export async function portalDirTreeGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 目录路径 */
    full_path?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.checkDirTree & API.RequestExtend>('/portal/dir/tree/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 在文件树上定位文件 http://127.0.0.1/portal/dir/tree_locate/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&full_path=/ GET /portal/dir/tree_locate/ */
export async function portalDirTreeLocateGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 目录路径 */
    full_path: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.checkDirTree & API.RequestExtend>('/portal/dir/tree_locate/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 确认目录路径合法性 http://127.0.0.1/dsm/dir/check/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&path=/test GET /dsm/dir/check/ */
export async function dsmDirCheckGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 目录路径 */
    path: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.checkDir & API.RequestExtend>('/dsm/dir/check/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看目录相关信息数量 http://127.0.0.1/ui/summary/dir_summary/ GET /ui/summary/dir_summary/ */
export async function uiSummaryDirSummaryGet(options?: { [key: string]: any }) {
  return request<API.DirSummary & API.RequestExtend>('/ui/summary/dir_summary/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有目录Worm信息 http://127.0.0.1/dsm/dir/get_all_worms/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/dir/get_all_worms/ */
export async function dsmDirGetAllWormsGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetAllWorms & API.RequestExtend>('/dsm/dir/get_all_worms/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取某个目录worm信息 http://127.0.0.1/dsm/dir/get_worm/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&parent_path=/dir&dir_name=dir02 GET /dsm/dir/get_worm/ */
export async function dsmDirGetWormGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 某目录父路径 */
    parent_path: string;
    /** 目录路名字 */
    dir_name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetOneWormInfo & API.RequestExtend>('/dsm/dir/get_worm/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置目录Worm属性 http://127.0.0.1/dsm/dir/set_worm/ POST /dsm/dir/set_worm/ */
export async function dsmDirSetWorm(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 父路径 */
    parent_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 最小保护周期 */
    min_protect_period: number;
    /** 最大保护周期 */
    max_protect_period: number;
    /** 默认保护周期 */
    default_protect_period: number;
    /** 自动锁定时间 */
    lock_period: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.SetWorm & API.RequestExtend>('/dsm/dir/set_worm/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改目录Worm属性 http://127.0.0.1/dsm/dir/modify_worm/ POST /dsm/dir/modify_worm/ */
export async function dsmDirModifyWorm(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 父路径 */
    parent_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 最小保护周期 */
    min_protect_period: number;
    /** 最大保护周期 */
    max_protect_period: number;
    /** 默认保护周期 */
    default_protect_period: number;
    /** 自动锁定时间 */
    lock_period: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ModifyWorm & API.RequestExtend>('/dsm/dir/modify_worm/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改目录 http://127.0.0.1/dsm/dir/modify/ POST /dsm/dir/modify/ */
export async function dsmDirModify(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 父路径 */
    parent_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 该参数是被操作记录使用，显示对象是全路径（父目录和子目录拼接） */
    name: string;
    /** 目录属主 */
    user?: string;
    /** 目录属组 */
    group?: string;
    /** 目录权限, 必须是三位数，每一位的值是0-7中的任一数字 */
    rights?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyDir & API.RequestExtend>('/dsm/dir/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 目录设置智能分层 http://127.0.0.1/dsm/dir/terra_tier/ POST /dsm/dir/terra_tier/ */
export async function dsmDirTerraTier(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 父路径 */
    parent_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 加速池名字 */
    performance_pool: string;
    /** 放置策略名称 */
    placement_policy: string;
    /** 迁移策略名称 */
    migration_policy: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.TerraTier & API.RequestExtend>('/dsm/dir/terra_tier/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除目录 http://127.0.0.1/dsm/dir/delete POST /dsm/dir/delete/ */
export async function dsmDirDelete(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 是否强制删除 */
    recursion: string;
    dir_list: { parent_path?: string; dir_name?: string }[];
    /** 删除目录路径平均的字符串,操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delDir & API.RequestExtend>('/dsm/dir/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取目录分类列表 http://127.0.0.1/dsm/dir/get_summary/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&share_type=0 GET /dsm/dir/get_summary/ */
export async function dsmDirGetSummaryGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 获取所有设置共享的目录，0为全部，1为cifs，2为nfs，3为ftp */
    share_type?: number;
    /** 获取所有设置配额的目录 */
    quota?: number;
    /** 获取所有设置qos的目录 */
    qos?: number;
    /** 获取所有设置快照的目录 */
    snapshot?: number;
    /** 获取所有超阈值的目录 */
    alert?: number;
    /** 获取使用该策略配置定时快照的目录 */
    snap_policy?: string;
    /** 获取使用智能分层的目录 */
    terra_tier?: number;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetSortedDir & API.RequestExtend>('/dsm/dir/get_summary/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取目录详情 http://127.0.0.1/dsm/dir/get_dir_detail/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&full_path=/test GET /dsm/dir/get_dir_detail/ */
export async function dsmDirGetDirDetailGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 需查看详情的目录 */
    full_path: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetDirDetail & API.RequestExtend>('/dsm/dir/get_dir_detail/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取目录对应用户用户组 http://127.0.0.1/dsm/dir/get_user_group_name GET /dsm/dir/get_user_group_name/ */
export async function dsmDirGetUserGroupNameGet(
  params?: {
    // query
    /** 用户ID */
    uid: number;
    /** 用户组ID */
    gid: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetUgName & API.RequestExtend>('/dsm/dir/get_user_group_name/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 能否设置目录分层 http://127.0.0.1/dsm/dir/tier_capability/ GET /dsm/dir/tier_capability/ */
export async function dsmDirTierCapabilityGet(
  params?: {
    // query
    cluster_id?: string;
    /** 当前目录路径，编辑目录时调用必传 */
    full_path?: string;
    /** 父目录路径，创建目录时调用必传 */
    parent_path?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.DirTierInfoResponse & API.RequestExtend>('/dsm/dir/tier_capability/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
