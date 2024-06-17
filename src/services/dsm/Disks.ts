// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取节点磁盘信息 获取节点磁盘信息 GET /api/deploy/terra_search/nodes/disk/ */
export async function apiDeployTerraSearchNodesDiskGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: {
        ip_address?: string;
        disks?: {
          path?: string;
          SN?: string;
          size?: number;
          disk_type?: string;
          recommend_disk?: boolean;
        }[];
      }[];
    } & API.RequestExtend
  >('/api/deploy/terra_search/nodes/disk/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置节点磁盘信息 配置磁盘信息以及推荐配置 POST /api/deploy/terra_search/nodes/disk/ */
export async function apiDeployTerraSearchNodesDisk(
  body: {
    ip_address?: string;
    disks?: {
      path?: string;
      SN?: string;
      size?: number;
      disk_type?: string;
      recommend_disk?: boolean;
    }[];
  }[],
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: any } & API.RequestExtend>(
    '/api/deploy/terra_search/nodes/disk/',
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
