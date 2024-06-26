// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get storage cluster configuration Get storage cluster domain and https port
 GET /api/terra_search/deploy/storage/config */
export async function apiTerraSearchDeployStorageConfigGet(options?: { [key: string]: any }) {
  return request<
    {
      certificate_content?: string;
      certificate_filename?: string;
      domain?: string;
      https_port?: number;
    } & API.RequestExtend
  >('/api/terra_search/deploy/storage/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Set storage cluster configuration and start deployment User manually set storage cluster address, upload storage cluster certificate and start deployment
 POST /api/terra_search/deploy/storage/config */
export async function apiTerraSearchDeployStorageConfig(
  body: {
    certificate_content?: string;
    certificate_filename?: string;
    domain?: string;
    https_port?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.APIParameterError & API.RequestExtend>(
    '/api/terra_search/deploy/storage/config',
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
