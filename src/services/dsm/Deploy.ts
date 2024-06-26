// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Restore configuration to initial state - Delete user_template
 POST /api/deploy/cancel */
export async function apiDeployCancel(options?: { [key: string]: any }) {
  return request<API.APIError & API.RequestExtend>('/api/deploy/cancel', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Query deployment steps GET /api/deploy/progress */
export async function apiDeployProgressGet(options?: { [key: string]: any }) {
  return request<API.APIError & API.RequestExtend>('/api/deploy/progress', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Start deployment POST /api/deploy/start */
export async function apiDeployStart(options?: { [key: string]: any }) {
  return request<API.APIError & API.RequestExtend>('/api/deploy/start', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get the current step being executed on the page Get the current step being executed on the page <br>
When closing the page and entering again, deployment can continue from the previous steps
 GET /api/deploy/step */
export async function apiDeployStepGet(options?: { [key: string]: any }) {
  return request<
    {
      status: 'initial' | 'deploying' | 'success' | 'failed';
      step:
        | 'deploy_mode'
        | 'discover_node'
        | 'configure_network'
        | 'configure_cluster'
        | 'configure_node_disk'
        | 'configure_node_nic'
        | 'preview'
        | 'deploy';
    } & API.RequestExtend
  >('/api/deploy/step', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update operation steps Update operation steps <br>
Supports the previous and next steps
 POST /api/deploy/step */
export async function apiDeployStep(
  body: {
    operation: string;
  },
  options?: { [key: string]: any },
) {
  return request<
    {
      status: 'initial' | 'deploying' | 'success' | 'failed';
      step:
        | 'deploy_mode'
        | 'discover_node'
        | 'configure_network'
        | 'configure_cluster'
        | 'configure_node_disk'
        | 'configure_node_nic'
        | 'preview'
        | 'deploy';
    } & API.RequestExtend
  >('/api/deploy/step', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
