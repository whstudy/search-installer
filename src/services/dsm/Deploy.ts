// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get progress of the deployment Get progress of the deployment.
 GET /api/terra_search/deploy/progress */
export async function apiTerraSearchDeployProgressGet(options?: { [key: string]: any }) {
  return request<
    {
      app_uri?: string;
      certificate_file?: string;
      mgmt_uri?: string;
      status?: 'initial' | 'deploying' | 'success' | 'failed';
    } & API.RequestExtend
  >('/api/terra_search/deploy/progress', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get the current step Get current step and all step
 GET /api/terra_search/deploy/step */
export async function apiTerraSearchDeployStepGet(options?: { [key: string]: any }) {
  return request<{ current_step?: number; steps?: string[] } & API.RequestExtend>(
    '/api/terra_search/deploy/step',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
