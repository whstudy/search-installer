// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查看操作记录各状态数量 http://127.0.0.1/ui/summary/operationrecordsummary/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84& GET /ui/summary/operationrecordsummary/ */
export async function uiSummaryOperationrecordsummaryGet(options?: { [key: string]: any }) {
  return request<API.operationRecordSummary & API.RequestExtend>(
    '/ui/summary/operationrecordsummary/',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 查看操作记录 http://127.0.0.1/dsm/operationrecord/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/operationrecord/ */
export async function dsmOperationrecordGet(
  params?: {
    // query
    /** 精确查询的字段及字符串 */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 操作开始执行的时间 */
    start_time?: number;
    /** 操作执行结束的时间 */
    end_time?: number;
    /** 要排序的字段 */
    sort_field?: string;
    /** 排序规则正序倒序,asc,desc */
    sort_rule?: string;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
    /** 操作记录筛选条件 */
    operation_list?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryOperationRecord & API.RequestExtend>('/dsm/operationrecord/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出操作记录 http://127.0.0.1/dsm/operationrecord/export/ POST /dsm/operationrecord/export/ */
export async function dsmOperationrecordExport(
  body: {
    /** 精确查询的字段及字符串 */
    filters?: string;
    /** 操作开始执行的时间 */
    start_time?: number;
    /** 操作执行结束的时间 */
    end_time?: number;
    /** 要排序的字段 */
    sort_field?: string;
    /** 排序规则正序倒序,asc,desc */
    sort_rule?: string;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
    /** 筛选查询条件 */
    operation_list?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.exportOperationRecord & API.RequestExtend>('/dsm/operationrecord/export/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
