// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取部署状态 获取部署terra_search所有步骤以及当前步骤 GET /app_setup/terra_search/step/ */
export async function appSetupTerraSearchStepGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: { all_step?: string[]; current_step?: number };
    } & API.RequestExtend
  >('/app_setup/terra_search/step/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取集群节点信息 获取集群节点信息以及部署模式 GET /app_setup/terra_search/cluster_node/ */
export async function appSetupTerraSearchClusterNodeGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: { deploy_mode?: string; ip_address?: string; username?: string; password?: string };
    } & API.RequestExtend
  >('/app_setup/terra_search/cluster_node/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置集群节点信息 设置节点信息以及部署模式 POST /app_setup/terra_search/cluster_node/ */
export async function appSetupTerraSearchClusterNode(
  body: {
    /** 标准模式或者快速模式(“standard”, "fast") */
    deploy_mode: string;
    /** 设置节点IP地址 */
    ip_address: string;
    /** 输入ip地址的主机用户 */
    username: string;
    /** 输入ip地址的主机密码 */
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: any } & API.RequestExtend>(
    '/app_setup/terra_search/cluster_node/',
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

/** 获取磁盘信息 获取磁盘信息以及推荐配置 GET /app_setup/terra_search/disk/ */
export async function appSetupTerraSearchDiskGet(options?: { [key: string]: any }) {
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
  >('/app_setup/terra_search/disk/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置磁盘信息 配置磁盘信息以及推荐配置 POST /app_setup/terra_search/disk/ */
export async function appSetupTerraSearchDisk(
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
    '/app_setup/terra_search/disk/',
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

/** 获取部署状态 获取DXN集群配置信息 GET /app_setup/api/get_magnascale_cluster_info/ */
export async function appSetupApiGetMagnascaleClusterInfoGet(options?: { [key: string]: any }) {
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
  >('/app_setup/api/get_magnascale_cluster_info/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置DXN信息 配置DXN信息以及证书 POST /app_setup/api/get_magnascale_cluster_info/ */
export async function appSetupApiGetMagnascaleClusterInfo(
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
    '/app_setup/api/get_magnascale_cluster_info/',
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

/** 获取部署结果 获取部署结果 GET /app_setup/api/get_terra_search_deploy_result/ */
export async function appSetupApiGetTerraSearchDeployResultGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: { status?: string; terra_search_app_address?: string; failed_reason?: string };
    } & API.RequestExtend
  >('/app_setup/api/get_terra_search_deploy_result/', {
    method: 'GET',
    ...(options || {}),
  });
}
