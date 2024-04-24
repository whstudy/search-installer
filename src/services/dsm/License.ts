// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询已授权节点 http://127.0.0.1/dsm/license/authorized/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/license/authorized/ */
export async function dsmLicenseAuthorizedGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryAuthorized & API.RequestExtend>('/dsm/license/authorized/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询待激活节点 http://127.0.0.1/dsm/license/activation/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/license/activation/ */
export async function dsmLicenseActivationGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryActivation & API.RequestExtend>('/dsm/license/activation/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询试用节点 http://127.0.0.1/dsm/license/trial/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/license/trial/ */
export async function dsmLicenseTrialGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryTrial & API.RequestExtend>('/dsm/license/trial/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询未使用的key http://127.0.0.1/dsm/license/unusedkey/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/license/unusedkey/ */
export async function dsmLicenseUnusedkeyGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryUnusedkey & API.RequestExtend>('/dsm/license/unusedkey/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取集群License信息 http://1027.0.0.1/dsm/license/info/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/license/info/ */
export async function dsmLicenseInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryLicenseInfo & API.RequestExtend>('/dsm/license/info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取集群过期情况（弃用） @swz 获取集群处于试用状态还是部分授权状态 GET /dsm/license/judge/ */
export async function dsmLicenseJudgeGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; data?: Record<string, any>; msg?: string } & API.RequestExtend>(
    '/dsm/license/judge/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 授权 POST /dsm/license/authorize/ */
export async function dsmLicenseAuthorize(
  body: {
    /** 集群ID */
    cluster_id: string;
    key: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.authorizeResult & API.RequestExtend>('/dsm/license/authorize/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 初始化授权 http://1027.0.0.1/dsm/license/clear_auth/ POST /dsm/license/clear_auth/ */
export async function dsmLicenseClearAuth(
  body: {
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.clearLicense & API.RequestExtend>('/dsm/license/clear_auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 解除授权 http://127.0.0.1/dsm/license/docancel/ POST /dsm/license/docancel/ */
export async function dsmLicenseDocancel(
  body: {
    /** 集群ID */
    cluster_id: string;
    node_ids: any[];
  },
  options?: { [key: string]: any },
) {
  return request<API.docancleLicense & API.RequestExtend>('/dsm/license/docancel/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询可解除授权节点 http://127.0.0.1/dsm/license/cancel/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/license/cancel/ */
export async function dsmLicenseCancelGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryCancleNode & API.RequestExtend>('/dsm/license/cancel/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询可回收KEY http://127.0.0.1/dsm/license/recycle/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/license/recycle/ */
export async function dsmLicenseRecycleGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryRecycle & API.RequestExtend>('/dsm/license/recycle/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 回收 http://127.0.0.1/dsm/license/dorecycle/ POST /dsm/license/dorecycle/ */
export async function dsmLicenseDorecycle(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 回收key列表 */
    keys: any[];
  },
  options?: { [key: string]: any },
) {
  return request<API.recycleKEY & API.RequestExtend>('/dsm/license/dorecycle/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出License文件 http://127.0.0.1/dsm/license/exlicense/ POST /dsm/license/exlicense/ */
export async function dsmLicenseExlicense(
  body: {
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.exportLicense & API.RequestExtend>('/dsm/license/exlicense/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导入License确认文件 http://127.0.0.1/dsm/license/enable/ POST /dsm/license/enable/ */
export async function dsmLicenseEnable(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 解析出的license确认文件的数据 */
    license_data: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.importLicenseFile & API.RequestExtend>('/dsm/license/enable/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 升级节点 http://127.0.0.1/dsm/license/upgrade/ POST /dsm/license/upgrade/ */
export async function dsmLicenseUpgrade(
  body: {
    /** 集群ID */
    cluster_id: string;
    key: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.upgrade & API.RequestExtend>('/dsm/license/upgrade/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** key查询 http://localhost:3000/dsm/license/additionkey/?cluster_id=dc5a0c72-10a6-11ec-9690-7aa2312b1aee&uuid=&key_category=1&status=0 GET /dsm/license/additionkey/ */
export async function dsmLicenseAdditionkeyGet(
  params?: {
    // query
    /** 集群id */
    cluster_id: string;
    /** uuid,仅在查询附属key时传参 */
    uuid?: string;
    /** 查询的key用途：1 主key,2 附属key, 查询空闲和附属key时均需 */
    key_category?: number;
    /** 查询未使用key的过滤 0 空闲，仅在查询空闲key时传参 */
    status?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryadditionkey & API.RequestExtend>('/dsm/license/additionkey/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加附属key http://127.0.0.1/dsm/license/add_additionkey/ POST /dsm/license/add_additionkey/ */
export async function dsmLicenseAddAdditionkey(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 节点的uuid */
    uuid?: string;
    subsidiary_key: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.addadditionkey & API.RequestExtend>('/dsm/license/add_additionkey/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 附属key解除授权 http://127.0.0.1/dsm/license/remove_additionkey/ POST /dsm/license/remove_additionkey/ */
export async function dsmLicenseRemoveAdditionkey(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** uuid */
    uuid?: string;
    /** 附属key */
    subsidiary_key: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.removeadditionkey & API.RequestExtend>('/dsm/license/remove_additionkey/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除附属key http://127.0.0.1/dsm/license/delete_additionkey/ POST /dsm/license/delete_additionkey/ */
export async function dsmLicenseDeleteAdditionkey(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** uuid */
    uuid?: string;
    /** 附属key */
    subsidiary_key: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.deleteadditionkey & API.RequestExtend>('/dsm/license/delete_additionkey/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
