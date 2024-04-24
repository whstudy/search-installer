// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 协议性能带宽 http://127.0.0.1/dsm/protocol/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10&protocol=NFS GET /dsm/protocol/ */
export async function dsmProtocolGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 精确查询的字段和值 */
    protocol?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.QueryProtocol & API.RequestExtend>('/dsm/protocol/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** FTP客户端详情 http://10.128.136.15/dsm/protocol/ftp_info/?preindex=1&sufindex=10 GET /dsm/protocol/ftp_info/ */
export async function dsmProtocolFtpInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 精确查询的字段和值 */
    protocol?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.QueryFtpInfo & API.RequestExtend>('/dsm/protocol/ftp_info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
