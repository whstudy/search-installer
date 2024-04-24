// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取版本信息 http://127.0.0.1/dsm/version/get_version/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/version/get_version/ */
export async function dsmVersionGetVersionGet(
  params?: {
    // query
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.versionInfo & API.RequestExtend>('/dsm/version/get_version/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
