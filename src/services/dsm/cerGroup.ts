// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询用户组 http://127.0.0.1/dsm/group/?preindex=1&sufindex=10&cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/group/ */
export async function dsmGroupGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 精确搜索的字段和字段值 */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
    /** 排序字段 */
    sort_field?: string;
    /** 排序方式, desc, asc */
    sort_rule?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryGroup & API.RequestExtend>('/dsm/group/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建本地用户组 http://127.0.0.1/dsm/group/ POST /dsm/group/ */
export async function dsmGroup(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 用户组名称 */
    cer_group_name: string;
    /** 用户组类型, local */
    type: string;
    /** 指定用户组的GID，非必传,支持的范围 4001~5999, 900~999 两个范围段, 900区间在用户是升级版本时后端会拦掉, 901~999 两个范围段, 900区间在用户是升级版本时后端会拦掉 */
    gid?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createGroup & API.RequestExtend>('/dsm/group/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户组 http://127.0.0.1/dsm/group/delete/ POST /dsm/group/delete/ */
export async function dsmGroupDelete(
  body: {
    /** 集群ID */
    cluster_id: string;
    cer_group_ids: number[];
    /** 认证用户组名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delGroup & API.RequestExtend>('/dsm/group/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户组 http://127.0.0.1/dsm/group/modify/ POST /dsm/group/modify/ */
export async function dsmGroupModify(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 认证用户组ID */
    cer_group_id: number;
    /** 新的组名称 */
    name: string;
    /** 类型, 只支持local */
    type?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyGroup & API.RequestExtend>('/dsm/group/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
