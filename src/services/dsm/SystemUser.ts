// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查看用户列表 http://127.0.0.1/portal/user/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84&preindex=1&sufindex=10 GET /portal/user/ */
export async function portalUserGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 查询用户名的字段 */
    username?: string;
    /** 精确查询角色的字段 superadmin/admin/user */
    role?: string;
    /** 查询邮箱的字段 支持精确和模糊查询 */
    email?: string;
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
  return request<API.queryViewUser & API.RequestExtend>('/portal/user/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加用户 http://127.0.0.1/portal/user/ POST /portal/user/ */
export async function portalUser(
  body: {
    /** 用户名 */
    username: string;
    /** 用户密码 */
    password: string;
    /** email */
    email: string;
    /** 角色: user/admin/superadmin */
    role?: string;
    /** 是否激活,默认为激活 */
    is_active?: boolean;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
    /** 集群id */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; data?: Record<string, any>; msg?: string } & API.RequestExtend>(
    '/portal/user/',
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

/** 编辑用户信息 http://127.0.0.1/portal/user/update_info/ POST /portal/user/update_info/ */
export async function portalUserUpdateInfo(
  body: {
    /** 所修改的用户id */
    id: number;
    /** 用户名 */
    username: string;
    /** email */
    email?: string;
    /** 角色:user/admin */
    role?: string;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
    /** 集群id */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.updateViewUser & API.RequestExtend>('/portal/user/update_info/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量启用用户 http://127.0.0.1/portal/user/enable/ POST /portal/user/enable/ */
export async function portalUserEnable(
  body: {
    ids: any;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
    /** 集群id */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.enableViewUser & API.RequestExtend>('/portal/user/enable/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量禁用用户 http://127.0.0.1/portal/user/disable/ POST /portal/user/disable/ */
export async function portalUserDisable(
  body: {
    ids: any;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
    /** 集群id */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.disableViewUser & API.RequestExtend>('/portal/user/disable/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更改用户密码 http://127.0.0.1/portal/user/change_password/ POST /portal/user/change_password/ */
export async function portalUserChangePassword(
  body: {
    /** 所修改的用户id */
    id: number;
    /** 原密码 */
    old_password?: string;
    /** 新密码 */
    password: string;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
    /** 集群id */
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.changePasswd & API.RequestExtend>('/portal/user/change_password/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 http://127.0.0.1/portal/user/delete/ POST /portal/user/delete/ */
export async function portalUserDelete(
  body: {
    ids: number[];
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
    /** 集群id */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delViewUser & API.RequestExtend>('/portal/user/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
