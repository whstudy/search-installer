// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取节点配置信息 获取节点配置信息以及部署模式 GET /api/deploy/terra_search/cluster/config */
export async function apiDeployTerraSearchClusterConfigGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: {
        deploy_mode?: string;
        ip_segments?: string;
        username?: string;
        password?: string;
        vip?: string;
      };
    } & API.RequestExtend
  >('/api/deploy/terra_search/cluster/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加节点配置信息 设置节点信息以及部署模式 POST /api/deploy/terra_search/cluster/config */
export async function apiDeployTerraSearchClusterConfig(
  body: {
    /** 标准模式或者快速模式(“standard”, "fast") */
    deploy_mode: string;
    /** 设置节点IP地址 */
    ip_segments: string;
    /** 输入ip地址的主机用户 */
    username: string;
    /** 输入ip地址的主机密码 */
    password: string;
    /** 集群的vip地址 */
    vip?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: any } & API.RequestExtend>(
    '/api/deploy/terra_search/cluster/config',
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
