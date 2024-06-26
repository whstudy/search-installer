// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get deployment config of the cluster Get deployment config of the cluster, used to get cluster nodes and deploy mode
 GET /api/terra_search/deploy/cluster/config */
export async function apiTerraSearchDeployClusterConfigGet(options?: { [key: string]: any }) {
  return request<
    {
      deploy_mode?: 'standard' | 'fast';
      ip_segments?: string;
      password?: string;
      username?: string;
      vip?: string;
    } & API.RequestExtend
  >('/api/terra_search/deploy/cluster/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Set deployment config of the cluster Set deployment config of the cluster, used to set cluster nodes and deploy mode
 POST /api/terra_search/deploy/cluster/config */
export async function apiTerraSearchDeployClusterConfig(
  body: {
    deploy_mode?: 'standard' | 'fast';
    ip_segments?: string;
    password?: string;
    username?: string;
    vip?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.APIParameterError & API.RequestExtend>(
    '/api/terra_search/deploy/cluster/config',
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
