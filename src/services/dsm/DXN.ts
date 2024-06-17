// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取DXN集群信息 获取DXN集群信息 GET /api/deploy/terra_search/cluster/magnascale_cluster_info/ */
export async function apiDeployTerraSearchClusterMagnascaleClusterInfoGet(options?: {
  [key: string]: any;
}) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: {
        domain_name?: string;
        https_port?: number;
        certificate_content?: string;
        certificate_filename?: string;
      };
    } & API.RequestExtend
  >('/api/deploy/terra_search/cluster/magnascale_cluster_info/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置DXN集群信息 配置DXN集群信息 POST /api/deploy/terra_search/cluster/magnascale_cluster_info/ */
export async function apiDeployTerraSearchClusterMagnascaleClusterInfo(
  body: {
    /** DXN域名 */
    domain_name: string;
    /** DXN https端口 */
    https_port: number;
    certificate_content: string;
    certificate_filename: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: any } & API.RequestExtend>(
    '/api/deploy/terra_search/cluster/magnascale_cluster_info/',
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
