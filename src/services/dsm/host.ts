// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询主机 http://127.0.0.1/dsm/host/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/host/ */
export async function dsmHostGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 用于筛选的关键字 */
    filters?: string;
    /** 按字段筛选 */
    fuzzy?: string;
    /** 模糊匹配 */
    keyword?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 按主机健康状态筛选 1为健康 0为故障. */
    status?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryHost & API.RequestExtend>('/dsm/host/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看主机详细信息 http://127.0.0.1/dsm/host/info/?culster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&host_id=1 GET /dsm/host/info/ */
export async function dsmHostInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 主机id */
    host_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.showHostInfo & API.RequestExtend>('/dsm/host/info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看主机网卡信息 http://127.0.1/dsm/host/nic/?cluster_id=a2fcda5c-00c2-11ec-9594-66f4c6d99e84&host_id=3 GET /dsm/host/nic/ */
export async function dsmHostNicGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 主机id */
    host_id: number;
    /** node1 */
    host_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.showHostNicInfo & API.RequestExtend>('/dsm/host/nic/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取主机bmc配置信息 http://127.0.0.1/dsm/host/get_bmc/?host_id=3&cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/host/get_bmc/ */
export async function dsmHostGetBmcGet(
  params?: {
    // query
    /** 被选中的主机id */
    host_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.getHostBmc & API.RequestExtend>('/dsm/host/get_bmc/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改主机bmc http://127.0.0.1/dsm/host/modify_bmc POST /dsm/host/modify_bmc/ */
export async function dsmHostModifyBmc(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 主机id */
    host_id: number;
    /** 主机名 */
    name: string;
    /** ipmi ip */
    ipmi_ip: string;
    /** ipmi 用户 */
    ipmi_user: string;
    /** ipmi 用户密码 */
    ipmi_pwd: string;
    /** ipmi 端口 */
    ipmi_port: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.modifyBMC & API.RequestExtend>('/dsm/host/modify_bmc/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 开机 http://127.0.0.1/dsm/host/poweron/ POST /dsm/host/poweron/ */
export async function dsmHostPoweron(
  body: {
    /** 集群ID */
    cluster_id: string;
    host_id: number[];
  },
  options?: { [key: string]: any },
) {
  return request<API.poweronHost & API.RequestExtend>('/dsm/host/poweron/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重启主机 http://127.0.0.1/dsm/host/restart/ POST /dsm/host/restart/ */
export async function dsmHostRestart(
  body: {
    /** 集群ID */
    cluster_id: string;
    host_id: number[];
    /** 主机名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.restartHost & API.RequestExtend>('/dsm/host/restart/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 关闭主机 http://127.0.0.1/dsm/host/shutdown/ POST /dsm/host/shutdown/ */
export async function dsmHostShutdown(
  body: {
    /** 集群ID */
    cluster_id: string;
    host_id: number[];
    /** 主机名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.shutdownHost & API.RequestExtend>('/dsm/host/shutdown/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置主机静态IP http://127.0.0.1/dsm/host/set_static_ip/ POST /dsm/host/set_static_ip/ */
export async function dsmHostSetStaticIp(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 主机ID */
    host_id: number;
    /** 网卡名 */
    network_card: string;
    /** ipv4地址，非必填, ipv4或ipv6至少有一个 */
    ipv4?: string;
    /** ipv6地址，非必填, ipv4或ipv6至少有一个 */
    ipv6?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.setStaticIP & API.RequestExtend>('/dsm/host/set_static_ip/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 性能图表数据 http://10.128.130.186/dsm/host/nicperf/?cluster_id=d7d3ce82-56ff-11ec-9663-7ee4fc27403b&host_id=1&net_card=ens20&items=lost,delay_time,down_bandwidth,up_bandwidth&time_from=1638259185&time_till=1638863989 GET /dsm/host/nicperf/ */
export async function dsmHostNicperfGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 主机ID */
    host_id: string;
    /** 网卡名 */
    net_card: string;
    /** 必选项，确定网卡监控对象类型,目前支持[lost,delay_time,down_bandwidth,up_bandwidth */
    items: string;
    /** 必选项，获取性能数据的起始时间，时间戳 */
    time_from: string;
    /** 必选项，获取性能数据的截至时间，时间戳 */
    time_till: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.NICPerformanceData & API.RequestExtend>('/dsm/host/nicperf/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
