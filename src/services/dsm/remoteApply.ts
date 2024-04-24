// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取冲突结果 http://127.0.0.1/dsm/remote_apply/check/ GET /dsm/remote_apply/check/ */
export async function dsmRemoteApplyCheckGet(
  params?: {
    // query
    cluster_id?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
    fuzzy?: string;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.RemoteApplyConfigCheck & API.RequestExtend>('/dsm/remote_apply/check/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 一键快速共享 http://127.0.0.1/dsm/remote_apply/ POST /dsm/remote_apply/ */
export async function dsmRemoteApply(
  body: {
    /** 目录绝对路径 */
    dir_name: string;
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createDir & API.RequestExtend>('/dsm/remote_apply/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修正group相关信息 http://127.0.0.1/dsm/remote_apply/modify_group POST /dsm/remote_apply/modify_group/ */
export async function dsmRemoteApplyModifyGroup(
  body: {
    /** 目录绝对路径 */
    dir_name: string;
    /** 集群ID */
    cluster_id: string;
    /** 用户组名称 */
    group_name: string;
    /** 用户组id */
    group_id: number;
    /** cifs共享信息唯一key。{共享类型}_user/group_{user_id/group_id} */
    uniq_name: string;
    /** true:跳过, false:修改 */
    ignore?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.RemoteApplyConfigModifyGroup & API.RequestExtend>(
    '/dsm/remote_apply/modify_group/',
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

/** 修正user相关信息 http://127.0.0.1/dsm/remote_apply/modify_user/ POST /dsm/remote_apply/modify_user/ */
export async function dsmRemoteApplyModifyUser(
  body: {
    /** 目录绝对路径 */
    dir_name: string;
    /** 集群ID */
    cluster_id: string;
    /** 共享类型，共两种 cifs、ftp */
    share_type: string;
    /** 用户名称 */
    user_name: string;
    /** 用户id */
    user_id: number;
    /** cifs or ftp共享信息唯一key. eg. cifs_user_{user_id}、 ftp_{user_id} */
    uniq_name: string;
    /** 跳过 */
    ignore?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.RemoteApplyConfigModifyUser & API.RequestExtend>(
    '/dsm/remote_apply/modify_user/',
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

/** 修正share_name http://127.0.0.1/dsm/remote_apply/modify_share_name POST /dsm/remote_apply/modify_share_name/ */
export async function dsmRemoteApplyModifyShareName(
  body: {
    /** 目录绝对路径 */
    dir_name: string;
    /** 集群ID */
    cluster_id: string;
    /** 共享名称 */
    share_name: string;
    /** 跳过 */
    ignore?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.RemoteApplyConfigModifyShareName & API.RequestExtend>(
    '/dsm/remote_apply/modify_share_name/',
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
