// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询认证用户 http://127.0.0.1/dsm/user/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/user/ */
export async function dsmUserGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 精确查询的字段和值, ftp_share:true/false，表示专门对ftp的排除和包含 */
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
  },
  options?: { [key: string]: any },
) {
  return request<API.queryUser & API.RequestExtend>('/dsm/user/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建认证用户 http://127.0.0.1/dsm/user/ POST /dsm/user/ */
export async function dsmUser(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 新建用户名称 */
    name: string;
    /** 新建用户属组gid */
    group_id: number;
    /** 用户密码 */
    passwd: string;
    /** 指定用户的UID，非必传,支持的范围 4001~5999, 900~999 两个范围段，用户是升级版本时后端会拦掉900区间, 901~999 两个范围段，用户是升级版本时后端会拦掉900区间 */
    uid?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createUser & API.RequestExtend>('/dsm/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改认证用户 http://127.0.0.1/dsm/user/modify/ POST /dsm/user/modify/ */
export async function dsmUserModify(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 用户ID */
    user_id: number;
    /** 用户组ID */
    group_id: number;
    /** 用户密码 */
    passwd: string;
    /** 用户名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyUser & API.RequestExtend>('/dsm/user/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除认证用户 http://127.0.0.1/dsm/user/delete/ POST /dsm/user/delete/ */
export async function dsmUserDelete(
  body: {
    /** 集群ID */
    cluster_id: string;
    cer_user_ids: number[];
    /** 被删除用户名字拼接的字符，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.DelUser & API.RequestExtend>('/dsm/user/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
