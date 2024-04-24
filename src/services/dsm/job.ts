// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 任务统计 http://127.0.0.1/dsm/job/census/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/job/census/ */
export async function dsmJobCensusGet(
  params?: {
    // query
    /** 用于筛选的关键字 */
    filters?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.jobCensus & API.RequestExtend>('/dsm/job/census/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看任务列表 http://127.0.0.1/dsm/job/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/job/ */
export async function dsmJobGet(
  params?: {
    // query
    /** 用于筛选的关键字 */
    filters?: string;
    /** 开始时间 */
    start_time?: number;
    /** 结束时间 */
    end_time?: number;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 要排序的字段 */
    sort_field?: string;
    /** 排序规则正序倒序,asc,desc */
    sort_rule?: string;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryJob & API.RequestExtend>('/dsm/job/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看任务详情 http://127.0.0.1/dsm/job/info/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&job_id=237 GET /dsm/job/info/ */
export async function dsmJobInfoGet(
  params?: {
    // query
    /** 任务ID */
    job_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryJobInfo & API.RequestExtend>('/dsm/job/info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看任务状态 http://10.128.129.201/dsm/job/status/?cluster_id=0cd17892-52a9-11ec-9f8a-7aa2312b1aee&job_ids=1144 GET /dsm/job/status/ */
export async function dsmJobStatusGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 任务ID */
    job_ids: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryJobStatus & API.RequestExtend>('/dsm/job/status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
