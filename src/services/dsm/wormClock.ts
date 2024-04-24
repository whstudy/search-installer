// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查看当前集群WORM时钟信息 http://127.0.0.1/dsm/worm/get_clock/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/worm/get_clock/ */
export async function dsmWormGetClockGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetWormClockInfo & API.RequestExtend>('/dsm/worm/get_clock/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 启动集群WORM时钟 http://127.0.0.1/dsm/worm/start_clock/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 POST /dsm/worm/start_clock/ */
export async function dsmWormStartClock(
  body: {
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.StartWormClock & API.RequestExtend>('/dsm/worm/start_clock/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
