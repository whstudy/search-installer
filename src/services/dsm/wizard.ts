// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取对象快速配置中各任务的状态 http://127.0.0.1/dsm/wizard/obj_task_status GET /dsm/wizard/obj_task_status/ */
export async function dsmWizardObjTaskStatusGet(options?: { [key: string]: any }) {
  return request<API.getWizardObjTaskStatus & API.RequestExtend>('/dsm/wizard/obj_task_status/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 对象中操作引导任务状态查询 http://127.0.0.1/dsm/obj/operation_guidance GET /dsm/obj/operation_guidance/ */
export async function dsmObjOperationGuidanceGet(options?: { [key: string]: any }) {
  return request<API.objOperationGuidance & API.RequestExtend>('/dsm/obj/operation_guidance/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置向导对象操作中节点IP信息查询 http://127.0.0.1/dsm/wizard/get_node_info/ GET /dsm/wizard/get_node_info/ */
export async function dsmWizardGetNodeInfoGet(options?: { [key: string]: any }) {
  return request<API.wizardObjNodeInfo & API.RequestExtend>('/dsm/wizard/get_node_info/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置向导中对象快速配置 http://127.0.0.1/dsm/wizard/obj_quick_config/ POST /dsm/wizard/obj_quick_config/ */
export async function dsmWizardObjQuickConfig(
  body: {
    /** 存储池安全策略 */
    pool_safe_type?: number;
    /** 数据池策略副本数 */
    size?: number;
    /** 数据池策略最小副本数 */
    min_size?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.OperationResponseInfo & API.RequestExtend>('/dsm/wizard/obj_quick_config/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
