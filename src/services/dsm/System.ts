// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 设置cifs全局配置 http://127.0.0.1/dsm/system/set_cifs_globals/ POST /dsm/system/set_cifs_globals/ */
export async function dsmSystemSetCifsGlobals(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 性能设置:Notify */
    notify: string;
    /** 性能设置:Oplock */
    oplock: string;
    /** 签名('false': Unable / 'true': Force Enable) */
    signing: string;
    /** 安全设置 */
    guest: string;
    /** 支持Windows ACL */
    enable_acl: string;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.setCIFSGlobal & API.RequestExtend>('/dsm/system/set_cifs_globals/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取cifs全局配置 http://127.0.0.1/dsm/system/get_cifs_globals/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84 GET /dsm/system/get_cifs_globals/ */
export async function dsmSystemGetCifsGlobalsGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getCIFSGlobal & API.RequestExtend>('/dsm/system/get_cifs_globals/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置集群配置 http://127.0.0.1/dsm/system/set_cluster_settings/ POST /dsm/system/set_cluster_settings/ */
export async function dsmSystemSetClusterSettings(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** IPv4 / IPv6/ 域名 */
    clock_service: string;
    /** 快照开关 true/false */
    show_snapshot: string;
    /** 操作对象名称，操作记录所需要的字段 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.setClusterSetting & API.RequestExtend>('/dsm/system/set_cluster_settings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取集群配置 http://127.0.0.1/dsm/system/get_cluster_settings/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84 GET /dsm/system/get_cluster_settings/ */
export async function dsmSystemGetClusterSettingsGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getClusterSetting & API.RequestExtend>('/dsm/system/get_cluster_settings/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置外部DNS http://127.0.0.1/dsm/system/set_outside_dns/ POST /dsm/system/set_outside_dns/ */
export async function dsmSystemSetOutsideDns(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** IPv4 主DNS */
    main_dns: string;
    /** IPv4 备DNS */
    standby_dns?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.setOutsideDNS & API.RequestExtend>('/dsm/system/set_outside_dns/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取DNS配置 http://127.0.0.1/dsm/system/get_dns_settings/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84 GET /dsm/system/get_dns_settings/ */
export async function dsmSystemGetDnsSettingsGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getDNSSetting & API.RequestExtend>('/dsm/system/get_dns_settings/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置集群DNS http://127.0.0.1/dsm/system/set_cluster_dns/ POST /dsm/system/set_cluster_dns/ */
export async function dsmSystemSetClusterDns(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** IPv4 集群DNS */
    cluster_dns: string;
    /** 集群dns域名 */
    cluster_dns_domain: string;
    /** 负载均衡策略 rr Round Robin 0 轮询 cc Connection Count 1 连接数 nl Node Load 2 综合负载 */
    balance_strategy: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.setClusterDNS & API.RequestExtend>('/dsm/system/set_cluster_dns/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询浮动IP http://127.0.0.1/dsm/system/get_floating_ip/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84 GET /dsm/system/get_floating_ip/ */
export async function dsmSystemGetFloatingIpGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getFloatingIP & API.RequestExtend>('/dsm/system/get_floating_ip/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询对象浮动IP http://127.0.0.1/dsm/system/get_obj_floating_ip/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84 GET /dsm/system/get_obj_floating_ip/ */
export async function dsmSystemGetObjFloatingIpGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getObjFloatingIP & API.RequestExtend>('/dsm/system/get_obj_floating_ip/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加浮动IP http://127.0.0.1/dsm/system/add_floating_ip/ POST /dsm/system/add_floating_ip/ */
export async function dsmSystemAddFloatingIp(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 浮动IP, ipv4 或 ipv6 */
    floating_ip: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.addFloatingIP & API.RequestExtend>('/dsm/system/add_floating_ip/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加对象浮动IP http://127.0.0.1/dsm/system/add_floating_ip/ POST /dsm/system/add_obj_floating_ip/ */
export async function dsmSystemAddObjFloatingIp(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 浮动IP, ipv4 */
    floating_ip: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.addFloatingIP & API.RequestExtend>('/dsm/system/add_obj_floating_ip/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除浮动IP http://127.0.0.1/dsm/system/del_floating_ip/ POST /dsm/system/del_floating_ip/ */
export async function dsmSystemDelFloatingIp(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 浮动IP, ipv4 或 ipv6 */
    floating_ip: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delFloatingIP & API.RequestExtend>('/dsm/system/del_floating_ip/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除对象浮动IP http://127.0.0.1/dsm/system/del_floating_ip/ POST /dsm/system/del_obj_floating_ip/ */
export async function dsmSystemDelObjFloatingIp(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 浮动IP, ipv4 */
    floating_ip: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.delObjFloatingIP & API.RequestExtend>('/dsm/system/del_obj_floating_ip/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取ftp全局配置 http://127.0.0.1/dsm/system/get_ftp_globals/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84 GET /dsm/system/get_ftp_globals/ */
export async function dsmSystemGetFtpGlobalsGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetFTPGlobal & API.RequestExtend>('/dsm/system/get_ftp_globals/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置ftp全局配置 http://127.0.0.1/dsm/system/set_ftp_globals/ POST /dsm/system/set_ftp_globals/ */
export async function dsmSystemSetFtpGlobals(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** True允许匿名访问，False不允许匿名访问 */
    anonymous_access: string;
    /** 匿名访问路径, 仅当anonymous_access为False时该字段非必须 */
    anonymous_path?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SetFtpGlobal & API.RequestExtend>('/dsm/system/set_ftp_globals/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 启用HDFS http://127.0.0.1/dsm/system/enable_hdfs/ POST /dsm/system/enable_hdfs/ */
export async function dsmSystemEnableHdfs(
  body: {
    /** 文件数据池或标准池 */
    pool_name: string;
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.asynJobResponse & API.RequestExtend>('/dsm/system/enable_hdfs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取HDFS配置 http://127.0.0.1/dsm/system/get_hdfs_setting/ GET /dsm/system/get_hdfs_setting/ */
export async function dsmSystemGetHdfsSettingGet(options?: { [key: string]: any }) {
  return request<API.getHdfsSetting & API.RequestExtend>('/dsm/system/get_hdfs_setting/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改对象域名 http://127.0.0.1/dsm/system/modify_obj_domain_name/ POST /dsm/system/modify_obj_domain_name/ */
export async function dsmSystemModifyObjDomainName(
  body: {
    /** 对象域名 */
    obj_domain_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.postExa & API.RequestExtend>('/dsm/system/modify_obj_domain_name/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取对象网关配置 http://127.0.0.1/dsm/system/get_obj_settings/ GET /dsm/system/get_obj_settings/ */
export async function dsmSystemGetObjSettingsGet(options?: { [key: string]: any }) {
  return request<API.getObjDomainName & API.RequestExtend>('/dsm/system/get_obj_settings/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改智能分层的迁移周期 http://127.0.0.1/dsm/system/set_tiering_cycle/ POST /dsm/system/set_tiering_cycle/ */
export async function dsmSystemSetTieringCycle(
  body: {
    /** 迁移周期，单位: 秒，最长是68年 */
    migration_cycle: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/system/set_tiering_cycle/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取智能分层的迁移周期 http://127.0.0.1/dsm/system/get_tiering_cycle/ GET /dsm/system/get_tiering_cycle/ */
export async function dsmSystemGetTieringCycleGet(options?: { [key: string]: any }) {
  return request<API.getTieringMigrationCycle & API.RequestExtend>(
    '/dsm/system/get_tiering_cycle/',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
