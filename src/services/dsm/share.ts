// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据目录获取所有共享 http://127.0.0.1/dsm/share/?share_path=/test_share2 GET /dsm/share/ */
export async function dsmShareGet(
  params?: {
    // query
    /** 共享目录全路径 */
    share_path: string;
    /** 与share_path一起传，表示查该目录下的快照的共享信息 */
    snap_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetShare & API.RequestExtend>('/dsm/share/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取CIFS共享 http://127.0.0.1/dsm/share/cifs/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/share/cifs/ */
export async function dsmShareCifsGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键 */
    filters?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetCIFSShareData & API.RequestExtend>('/dsm/share/cifs/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取NFSv3共享 http://127.0.0.1/dsm/share/nfsv3/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/share/nfsv3/ */
export async function dsmShareNfsv3Get(
  params?: {
    // query
    /** 集群ID */
    cluster_id?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetNFSShareData & API.RequestExtend>('/dsm/share/nfsv3/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取CIFS共享授权 http://127.0.0.1/dsm/share/cifs_target/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84&id=16&target_category=host&preindex=1&sufindex=10 GET /dsm/share/cifs_target/ */
export async function dsmShareCifsTargetGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** CIFS共享id */
    share_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetCIFSShareTargetData & API.RequestExtend>('/dsm/share/cifs_target/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取NFSv3共享授权 http://127.0.0.1/dsm/share/nfsv3_target/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84&id=16&target_category=host&preindex=1&sufindex=10 GET /dsm/share/nfsv3_target/ */
export async function dsmShareNfsv3TargetGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id?: string;
    /** 类型（主机、网络组...） */
    target_category: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** NFSv3共享id */
    share_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetNFSShareTargetData & API.RequestExtend>('/dsm/share/nfsv3_target/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建CIFS共享 http://127.0.0.1/dsm/share/create_cifs/ POST /dsm/share/create_cifs/ */
export async function dsmShareCreateCifs(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享名称 */
    share_name: string;
    /** 共享路径 */
    share_path: string;
    target_infos: { rights?: string; target_type?: string; target_name?: string }[];
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createCIFS & API.RequestExtend>('/dsm/share/create_cifs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建快照CIFS共享 http://127.0.0.1/dsm/share/create_snapshot_cifs/ POST /dsm/share/create_snapshot_cifs/ */
export async function dsmShareCreateSnapshotCifs(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享名称 */
    share_name: string;
    /** 共享路径 */
    share_path: string;
    /** 快照ID */
    snapshot_id: number;
    target_infos: { rights?: string; target_type?: string; target_name?: string }[];
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createCIFS & API.RequestExtend>('/dsm/share/create_snapshot_cifs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建NFSv3共享 http://127.0.0.1/dsm/share/create_nfsv3/ POST /dsm/share/create_nfsv3/ */
export async function dsmShareCreateNfsv3(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享名称，随机生成 */
    share_name: string;
    /** 共享路径 */
    share_path: string;
    /** nfs版本号 */
    nfs_version: string;
    target_infos: {
      rights?: string;
      target_type?: string;
      target_name?: string;
      squash?: string;
      advance?: string;
    }[];
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ResponseData & API.RequestExtend>('/dsm/share/create_nfsv3/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建快照NFSv3共享 http://127.0.0.1/dsm/share/create_snapshot_nfsv3/ POST /dsm/share/create_snapshot_nfsv3/ */
export async function dsmShareCreateSnapshotNfsv3(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享名称，随机生成 */
    share_name: string;
    /** 共享路径 */
    share_path: string;
    /** nfs版本号 */
    nfs_version: string;
    target_infos: {
      rights?: string;
      target_type?: string;
      target_name?: string;
      squash?: string;
      advance?: string;
    }[];
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ResponseData & API.RequestExtend>('/dsm/share/create_snapshot_nfsv3/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建CIFS共享授权 http://127.0.0.1/dsm/share/create_cifs_target/ POST /dsm/share/create_cifs_target/ */
export async function dsmShareCreateCifsTarget(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** CIFS共享id */
    share_id: number;
    target_infos: { rights?: string; target_type?: string; target_name?: string }[];
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createCIFStarget & API.RequestExtend>('/dsm/share/create_cifs_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建nfsv3共享授权 http://10.128.136.35/dsm/share/create_nfsv3_target/ POST /dsm/share/create_nfsv3_target/ */
export async function dsmShareCreateNfsv3Target(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** NFSv3共享id */
    share_id: number;
    /** 共享目录路径 */
    share_path: string;
    /** 快照ID */
    snapshot_id?: number;
    target_infos: {
      rights?: string;
      target_type?: string;
      target_name?: string;
      squash?: string;
      advance?: string;
    }[];
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createNFStarget & API.RequestExtend>('/dsm/share/create_nfsv3_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update a share right POST /dsm/share/modify_cifs/ */
export async function dsmShareModifyCifs(
  body: {
    /** cluster id */
    cluster_id: string;
    /** The right id of one share. */
    share_target_id: string;
    /** The share dir path. */
    share_path?: string;
    /** The type name of share. */
    type_name?: string;
    /** Rights of the share right. */
    new_right?: string;
    /** target_name 共享授权名字，操作记录需要该参数，name字段 */
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ResponseData & API.RequestExtend>('/dsm/share/modify_cifs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新cifs授权 http://127.0.0.1/dsm/share/modify_cifs_target/ POST /dsm/share/modify_cifs_target/ */
export async function dsmShareModifyCifsTarget(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享授权id */
    share_target_id: number;
    /** 新的权限 */
    new_right: string;
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyCIFStarget & API.RequestExtend>('/dsm/share/modify_cifs_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新nfs授权 http://127.0.0.1/dsm/share/modify_nfsv3_target/ POST /dsm/share/modify_nfsv3_target/ */
export async function dsmShareModifyNfsv3Target(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享授权id */
    share_target_id: number;
    /** 新的权限 */
    new_right: string;
    /** 共享授权名字，操作记录需要该参数 */
    name: string;
    new_squash: string;
    new_advance: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyNFStarget & API.RequestExtend>('/dsm/share/modify_nfsv3_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新nfs版本号 http://127.0.0.1/dsm/share/modify_nfs/ POST /dsm/share/modify_nfs/ */
export async function dsmShareModifyNfs(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 目录名称 */
    name?: string;
    /** nfs共享id */
    share_id: number;
    /** nfs版本号 */
    nfs_version: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyNFS & API.RequestExtend>('/dsm/share/modify_nfs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除CIFS共享 http://127.0.0.1/dsm/share/delete_cifs/ POST /dsm/share/delete_cifs/ */
export async function dsmShareDeleteCifs(
  body: {
    /** 集群ID */
    cluster_id: string;
    share_ids: number[];
    /** 共享名字,如果是多个,使用英文逗号隔开,操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delCIFS & API.RequestExtend>('/dsm/share/delete_cifs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除NFSv3共享 http://127.0.0.1/dsm/share/delete_nfsv3/ POST /dsm/share/delete_nfsv3/ */
export async function dsmShareDeleteNfsv3(
  body: {
    /** 集群ID */
    cluster_id: string;
    share_ids: number[];
    /** 共享名字,如果是多个,使用英文逗号隔开,操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delNFS & API.RequestExtend>('/dsm/share/delete_nfsv3/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除CIFS共享授权 http://127.0.0.1/dsm/share/delete_cifs_target/ POST /dsm/share/delete_cifs_target/ */
export async function dsmShareDeleteCifsTarget(
  body: {
    /** 集群ID */
    cluster_id: string;
    target_ids: number[];
    /** 共享授权名字,如果是多个,使用英文逗号隔开,操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delCIFSTarget & API.RequestExtend>('/dsm/share/delete_cifs_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除NFSv3共享授权 http://127.0.0.1/dsm/share/delete_nfsv3_target/ POST /dsm/share/delete_nfsv3_target/ */
export async function dsmShareDeleteNfsv3Target(
  body: {
    /** 集群ID */
    cluster_id: string;
    share_rights: number[];
    /** 共享授权名字,如果是多个,使用英文逗号隔开,操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delNFSTarget & API.RequestExtend>('/dsm/share/delete_nfsv3_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询FTP共享授权 http://127.0.0.1/dsm/share/ftp/query/ GET /dsm/share/ftp/query/ */
export async function dsmShareFtpQueryGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 共享文件夹名字 */
    dir_name: string;
    /** 共享文件父目录 */
    parent_path: string;
    /** 分页查询前索引 */
    preindex: number;
    /** 分页查询后索引 */
    sufindex: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.FtpQuery & API.RequestExtend>('/dsm/share/ftp/query/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建FTP共享授权 http://127.0.0.1/dsm/share/ftp/create_target/ POST /dsm/share/ftp/create_target/ */
export async function dsmShareFtpCreateTarget(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享文件夹名字 */
    dir_name: string;
    /** 共享文件父目录 */
    parent_path: string;
    items: { rights?: string; user?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<API.CreateFTPTarget & API.RequestExtend>('/dsm/share/ftp/create_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改FTP共享授权 http://127.0.0.1/dsm/share/ftp/modify_right/ POST /dsm/share/ftp/modify_right/ */
export async function dsmShareFtpModifyRight(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享文件夹名字 */
    dir_name: string;
    /** 共享文件父目录 */
    parent_path: string;
    items: { rights?: string; user?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<API.ModifyFTPTarget & API.RequestExtend>('/dsm/share/ftp/modify_right/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除FTP共享授权 http://127.0.0.1/dsm/share/ftp/delete_target/ POST /dsm/share/ftp/delete_target/ */
export async function dsmShareFtpDeleteTarget(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 共享文件夹名字 */
    dir_name: string;
    /** 用户名 */
    user: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.DeleteFTPTarget & API.RequestExtend>('/dsm/share/ftp/delete_target/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
