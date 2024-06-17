// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取部署状态 获取部署terra_search所有步骤以及当前步骤 GET /api/deploy/terra_search/step/ */
export async function apiDeployTerraSearchStepGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: { all_step?: string[]; current_step?: number };
    } & API.RequestExtend
  >('/api/deploy/terra_search/step/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取部署结果 获取部署结果 GET /api/deploy/terra_search/get_deploy_result/ */
export async function apiDeployTerraSearchGetDeployResultGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: {
        status?: string;
        terra_search_app_address?: string;
        terra_search_address?: string;
        certificate_file?: string;
        failed_reason?: string;
      };
    } & API.RequestExtend
  >('/api/deploy/terra_search/get_deploy_result/', {
    method: 'GET',
    ...(options || {}),
  });
}
