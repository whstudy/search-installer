// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取复制集群配置 http://127.0.0.1/dsm/rep/replication_info/ GET /dsm/rep/replication_info/ */
export async function dsmRepReplicationInfoGet(
  params?: {
    // query
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.repClusterConfigResponse & API.RequestExtend>('/dsm/rep/replication_info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取可添加成为复制节点的空闲节点列表 http://127.0.0.1/dsm/rep/rep_node_candidates/ GET /dsm/rep/rep_node_candidates/ */
export async function dsmRepRepNodeCandidatesGet(
  params?: {
    // query
    cluster_id?: string;
    keyword?: string;
    fuzzy?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.nodesToRepResponse & API.RequestExtend>('/dsm/rep/rep_node_candidates/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取已添加的复制节点列表 http://127.0.0.1/dsm/rep/rep_nodes/ GET /dsm/rep/rep_nodes/ */
export async function dsmRepRepNodesGet(
  params?: {
    // query
    keyword?: string;
    fuzzy?: string;
    /** 排序字段 */
    sort_field?: string;
    /** 排序规则 */
    sort_rule?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 集群uuid */
    rep_cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.listRepedNodesResponse & API.RequestExtend>('/dsm/rep/rep_nodes/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 初始化集群复制的配置 http://127.0.0.1/dsm/rep/create_rep_cluster/ POST /dsm/rep/create_rep_cluster/ */
export async function dsmRepCreateRepCluster(
  body: API.clusterConfigRequestBody,
  options?: { [key: string]: any },
) {
  return request<API.repClusterConfigResponse & API.RequestExtend>('/dsm/rep/create_rep_cluster/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新集群复制的配置 http://127.0.0.1/dsm/rep/update_rep_cluster/ POST /dsm/rep/update_rep_cluster/ */
export async function dsmRepUpdateRepCluster(
  body: API.clusterConfigRequestBody,
  options?: { [key: string]: any },
) {
  return request<API.repClusterConfigResponse & API.RequestExtend>('/dsm/rep/update_rep_cluster/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除集群复制的配置 http://127.0.0.1/dsm/rep/delete_rep_cluster/ POST /dsm/rep/delete_rep_cluster/ */
export async function dsmRepDeleteRepCluster(
  body: {
    /** cluster_uuid */
    rep_cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.repClusterConfigResponse & API.RequestExtend>('/dsm/rep/delete_rep_cluster/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 初始化集群复制的配置 http://127.0.0.1/dsm/rep/create_rep_nodes/ POST /dsm/rep/create_rep_nodes/ */
export async function dsmRepCreateRepNodes(
  body: {
    rep_cluster_id: string;
    nodes_info: { node_name?: string; nic_name?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/rep/create_rep_nodes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除复制节点 http://127.0.0.1/dsm/rep/destroy_rep_nodes/ POST /dsm/rep/destroy_rep_nodes/ */
export async function dsmRepDestroyRepNodes(
  body: {
    rep_cluster_id: string;
    node_names: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/rep/destroy_rep_nodes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制节点带宽性能图 http://127.0.0.1/dsm/rep/metrics_history/ GET /dsm/rep/metrics_history/ */
export async function dsmRepMetricsHistoryGet(
  params?: {
    // query
    /** uuid */
    rep_cluster_id?: string;
    /** 时段 单位s */
    duration?: number;
    node_name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.repNodeBwMetricResponse & API.RequestExtend>('/dsm/rep/metrics_history/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 复制对进行状态统计 http://127.0.0.1/ui/summary/relationship_status/ GET /ui/summary/relationship_status/ */
export async function uiSummaryRelationshipStatusGet(
  params?: {
    // query
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.relationshipStatistic & API.RequestExtend>(
    '/ui/summary/relationship_status/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 复制对信息 http://127.0.0.1/dsm/relationship/ GET /dsm/relationship/ */
export async function dsmRelationshipGet(
  params?: {
    // query
    cluster_id?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
    keyword?: string;
    /** 传source_dir, 后段实际会查询source和target目录 */
    fuzzy?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.relationshipInfoResponse & API.RequestExtend>('/dsm/relationship/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建复制对 http://127.0.0.1/dsm/relationship/ POST /dsm/relationship/ */
export async function dsmRelationship(
  body: {
    policy_name: string;
    sync_source_qos: boolean;
    sync_source_quota: boolean;
    source_reserved_num: number;
    mirror_reserved_num: number;
    copy_on_created: boolean;
    source_dir: string;
    mirror_dir: string;
    mirror_addrressed_ip: string;
    remote_cluster_control_port: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/relationship/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制对状态 http://127.0.0.1/dsm/relationship/status/ GET /dsm/relationship/status/ */
export async function dsmRelationshipStatusGet(
  params?: {
    // query
    cluster_id?: string;
    /** uuid字符串，逗隔 */
    relationship_uuids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.relationshipStatusResponse & API.RequestExtend>('/dsm/relationship/status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑复制对 http://127.0.0.1/dsm/relationship/modify/ POST /dsm/relationship/modify/ */
export async function dsmRelationshipModify(
  body: {
    relationship_uuid: string;
    policy_id?: string;
    sync_source_qos: boolean;
    sync_source_quota: boolean;
    source_reserved_num: number;
    mirror_reserved_num: number;
    copy_on_created: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/relationship/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 全局消息 http://127.0.0.1/dsm/relationship/messages/ GET /dsm/relationship/messages/ */
export async function dsmRelationshipMessagesGet(
  params?: {
    // query
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.relationshipMessageResponse & API.RequestExtend>(
    '/dsm/relationship/messages/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 确认全局消息 http://127.0.0.1/dsm/relationship/confirm_message/ POST /dsm/relationship/confirm_message/ */
export async function dsmRelationshipConfirmMessage(
  body: {
    message_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/relationship/confirm_message/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制能力检测接口 http://127.0.0.1/dsm/relationship/capability/ GET /dsm/relationship/capability/ */
export async function dsmRelationshipCapabilityGet(
  params?: {
    // query
    cluster_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.relationshipCapabilityResponse & API.RequestExtend>(
    '/dsm/relationship/capability/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取管理IP， 用于去目标授权获取一个有效的管控面IP http://127.0.0.1/dsm/relationship/get_mirror_mgmt_ip/ GET /dsm/relationship/get_mgmt_ip/ */
export async function dsmRelationshipGetMgmtIpGet(
  params?: {
    // query
    relationship_uuid?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.mgntIpResponse & API.RequestExtend>('/dsm/relationship/get_mgmt_ip/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
