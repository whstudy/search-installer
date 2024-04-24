// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function dsmDownload(
  params?: {
    name?: string;
    bucket?: string;
    owner?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryobjroutercandidates & API.RequestExtend>(
    '/dsm/object/download/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

export async function dsmShareLink(
  params?: {
    // query
    /** 某个对象路由的ID */
    id?: string;
    /** 1,表示修改路由;2,表示为某个路由添加负载均衡器;该值和router_id结合使用; */
    update?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryobjroutercandidates & API.RequestExtend>(
    '/dsm/object/share_link/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取对象路由候选负载均衡器节点 http://127.0.0.1/dsm/obj/routers/node-candidates/ GET /dsm/obj/routers/node-candidates/ */
export async function dsmObjBucket(
  params?: {
    // query
    /** 某个对象路由的ID */
    id?: string;
    /** 1,表示修改路由;2,表示为某个路由添加负载均衡器;该值和router_id结合使用; */
    update?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryobjroutercandidates & API.RequestExtend>(
    '/dsm/object/bucket/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取对象列表 http://127.0.0.1/dsm/obj/routers/ GET /dsm/obj/routers/ */
export async function dsmObjectGet(
  body?: {
    // query
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryObjRouters & API.RequestExtend>('/dsm/object/', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function dsmObjectDelete(
  body: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.createobjgateway & API.RequestExtend>('/dsm/object/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function dsmObjectResetEs(
  body: {
  },
  options?: { [key: string]: any },
) {
  return request<API.createobjgateway & API.RequestExtend>('/dsm/object/reset_es/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function dsmObjectInitialize(
  body: {
    management_ip: string;
    user_name: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.createobjgateway & API.RequestExtend>('/dsm/object/initialize/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function dsmObjectStep(
  params?: {
  },
  options?: { [key: string]: any },
) {
  return request<API.queryObjRouterNodes & API.RequestExtend>('/dsm/object/initialize_stage/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
