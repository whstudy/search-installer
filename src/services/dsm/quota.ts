// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取目录配额信息 http://127.0.0.1/dsm/dir/get_quota_info/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&full_path=/test GET /dsm/dir/get_quota_info/ */
export async function dsmDirGetQuotaInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 目录路径 */
    full_path: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetQuotaInfo & API.RequestExtend>('/dsm/dir/get_quota_info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户默认配额 http://127.0.0.1/dsm/dir/get_user_default_quota GET /dsm/dir/get_user_default_quota/ */
export async function dsmDirGetUserDefaultQuotaGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetUserDefaultQuota & API.RequestExtend>('/dsm/dir/get_user_default_quota/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置用户默认配额 http://127.0.0.1/dsm/dir/set_user_default_quota/ POST /dsm/dir/set_user_default_quota/ */
export async function dsmDirSetUserDefaultQuota(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 用户容量配额, 0取消配额 */
    capacity_quota: number;
    /** 用户文件数配额，0取消配额 */
    file_quota: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.SetUserDefaultQuota & API.RequestExtend>('/dsm/dir/set_user_default_quota/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户组默认配额 http://127.0.0.1/dsm/dir/get_group_default_quota GET /dsm/dir/get_group_default_quota/ */
export async function dsmDirGetGroupDefaultQuotaGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetGroupDefaultQuota & API.RequestExtend>(
    '/dsm/dir/get_group_default_quota/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 设置用户组默认配额 http://127.0.0.1/dsm/dir/set_group_default_quota/ POST /dsm/dir/set_group_default_quota/ */
export async function dsmDirSetGroupDefaultQuota(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 容量配额，0取消配额 */
    capacity_quota: number;
    /** 文件数配额，0取消配额 */
    file_quota: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.SetGroupDefaultQuota & API.RequestExtend>(
    '/dsm/dir/set_group_default_quota/',
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

/** 设置目录配额 http://127.0.0.1/dsm/dir/setquota/ POST /dsm/dir/setquota/ */
export async function dsmDirSetquota(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 父路径 */
    parent_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 该参数是被操作记录使用，显示对象是全路径（父目录和子目录拼接） */
    name: string;
    /** 容量配额单位 */
    byte_unit?: string;
    /** 最大容量配额 */
    max_byte?: number;
    /** 最大文件数配额 */
    max_files?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.dirsetquota & API.RequestExtend>('/dsm/dir/setquota/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户|用户组配额 http://127.0.0.1/dsm/dir/get_user_group_quota/ GET /dsm/dir/get_user_group_quota/ */
export async function dsmDirGetUserGroupQuotaGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 精确查询的字段和值 */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
    /** 用于排序的字段 */
    sort_field?: string;
    /** 用于排序的规则, desc, asc */
    sort_rule?: string;
    /** 要查询的是用户或用户组类型配额信息，参数[user|group] */
    user_group_type: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.QueryUserGroupQuota & API.RequestExtend>('/dsm/dir/get_user_group_quota/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建用户|用户组配额 http://127.0.0.1/dsm/dir/set_user_group_quota/ POST /dsm/dir/set_user_group_quota/ */
export async function dsmDirSetUserGroupQuota(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 用户|用户组名字 */
    name: string;
    /** 确定要给某个用户还是用户组创建配额，参数[1:用户,2:用户组] */
    user_group_type: string;
    /** 要确定是[LOCAL|AD|NIS|LDAP]域 */
    domain_type: string;
    /** 容量配额 */
    capacity: number;
    /** 文件数配额 */
    file_number: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.SetUserGroupQuota & API.RequestExtend>('/dsm/dir/set_user_group_quota/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户|用户组配额 http://127.0.0.1/dsm/dir/modify_user_group_quota/ POST /dsm/dir/modify_user_group_quota/ */
export async function dsmDirModifyUserGroupQuota(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 用户|用户组配额的ID */
    id: number;
    /** 用户|用户组名字,操作记录需要 */
    name: string;
    /** 容量配额 */
    capacity: number;
    /** 文件数配额 */
    file_number: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ModifyUserGroupQuota & API.RequestExtend>(
    '/dsm/dir/modify_user_group_quota/',
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

/** 删除用户|用户组配额 http://127.0.0.1/dsm/dir/modify_user_group_quota/ POST /dsm/dir/delete_user_group_quota/ */
export async function dsmDirDeleteUserGroupQuota(
  body: {
    /** 集群ID */
    cluster_id: string;
    ids: number[];
    /** 多个用户|用户组名字，使用英文逗号隔开,操作记录需要 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.DeleteUserGroupQuota & API.RequestExtend>(
    '/dsm/dir/delete_user_group_quota/',
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
