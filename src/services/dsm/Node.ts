// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get disks on cluster nodes Get disks on cluster nodes excluding the system disk
 GET /api/terra_search/deploy/node */
export async function apiTerraSearchDeployNodeGet(options?: { [key: string]: any }) {
  return request<
    {
      disks?: {
        is_selected?: boolean;
        name?: string;
        serial_number?: string;
        size?: number;
        type?: 'NVME' | 'SAS' | 'SATA' | 'HDD';
      }[];
      ip_address?: string;
    }[] &
      API.RequestExtend
  >('/api/terra_search/deploy/node', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Set data disk for cluster nodes User manually selects elasticsearch data disk for nodes
 POST /api/terra_search/deploy/node */
export async function apiTerraSearchDeployNode(
  body: {
    disks?: {
      is_selected?: boolean;
      name?: string;
      serial_number?: string;
      size?: number;
      type?: 'NVME' | 'SAS' | 'SATA' | 'HDD';
    }[];
    ip_address?: string;
  }[],
  options?: { [key: string]: any },
) {
  return request<API.APIParameterError & API.RequestExtend>('/api/terra_search/deploy/node', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
