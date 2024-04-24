// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 为cifs节点配置AD域 http://127.0.0.1/dsm/domain/join_AD_domain/ POST /dsm/domain/join_AD_domain/ */
export async function dsmDomainJoinAdDomain(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 操作记录需要该参数 */
    name: string;
    /** AD域域名 */
    AD_domain_name: string;
    /** AD域服务ip */
    AD_domain_server_ip: string;
    /** AD域用户名 */
    AD_domain_user_name: string;
    /** AD域用户密码 */
    AD_domain_user_pass: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/domain/join_AD_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看AD域信息 http://127.0.0.1/dsm/domain/show_AD_domain/?cluster_id=32bd1b38-d978-11eb-b95f-66f4c6d99e84 GET /dsm/domain/show_AD_domain/ */
export async function dsmDomainShowAdDomainGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getADInfo & API.RequestExtend>('/dsm/domain/show_AD_domain/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 测试AD域是否可达 http://127.0.0.1/dsm/domain/test_AD_domain/ POST /dsm/domain/test_AD_domain/ */
export async function dsmDomainTestAdDomain(
  body: {
    /** 集群id */
    cluster_id?: string;
    /** 操作记录需要该参数 */
    name?: string;
    /** AD域名 */
    AD_domain_name?: string;
    /** AD域服务IP */
    AD_domain_server_ip?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.testADdomain & API.RequestExtend>('/dsm/domain/test_AD_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 为修改AD域密码 http://127.0.0.1/dsm/domain/modify_ad_domain/ POST /dsm/domain/modify_ad_domain/ */
export async function dsmDomainModifyAdDomain(
  body: {
    /** AD域新密码 */
    new_password: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/domain/modify_ad_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** cifs节点退出AD域 http://127.0.0.1/dsm/domain/leave_AD_domain/ POST /dsm/domain/leave_AD_domain/ */
export async function dsmDomainLeaveAdDomain(
  body: {
    /** 集群ID */
    cluster_id?: string;
    /** 操作记录需要该参数 */
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.quitADdomain & API.RequestExtend>('/dsm/domain/leave_AD_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 为nfs节点配置LDAP域 http://127.0.0.1/dsm/domain/add_LDAP_domain/ POST /dsm/domain/add_LDAP_domain/ */
export async function dsmDomainAddLdapDomain(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** LDAP域服务IP */
    LDAP_domain_server_ip: string;
    /** LDAP域端口 */
    LDAP_domain_server_port: string;
    /** 基准DN */
    LDAP_domain_base_DN: string;
    /** 操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.addLDAPdomain & API.RequestExtend>('/dsm/domain/add_LDAP_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看某个集群的LDAP域信息 http://127.0.0.1/dsm/domain/show_LDAP_domain/ GET /dsm/domain/show_LDAP_domain/ */
export async function dsmDomainShowLdapDomainGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getLDAPInfo & API.RequestExtend>('/dsm/domain/show_LDAP_domain/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 测试LDAP域是否可达 http://127.0.0.1/dsm/domain/test_LDAP_domain/ POST /dsm/domain/test_LDAP_domain/ */
export async function dsmDomainTestLdapDomain(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** LDAP域服务IP */
    LDAP_domain_server_ip?: string;
    /** LDAP域端口 */
    LDAP_domain_server_port?: string;
    /** 基准DN */
    LDAP_domain_base_DN: string;
    /** 操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.testLDAPdomain & API.RequestExtend>('/dsm/domain/test_LDAP_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** nfs节点退出LDAP域 http://127.0.0.1/dsm/domain/quit_LDAP_domain/ POST /dsm/domain/quit_LDAP_domain/ */
export async function dsmDomainQuitLdapDomain(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.quitLDAPdomain & API.RequestExtend>('/dsm/domain/quit_LDAP_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 为NAS节点配置NIS域 http://127.0.0.1/dsm/domain/join_NIS_domain/ POST /dsm/domain/join_NIS_domain/ */
export async function dsmDomainJoinNisDomain(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** NIS域服务IP */
    NIS_domain_server_ip: string;
    /** NIS域名 */
    NIS_domain_name: string;
    /** 操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.JoinNISDomain & API.RequestExtend>('/dsm/domain/join_NIS_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看某个集群的NIS域信息 http://127.0.0.1/dsm/domain/show_NIS_domain/ GET /dsm/domain/show_NIS_domain/ */
export async function dsmDomainShowNisDomainGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getNISDomainInfo & API.RequestExtend>('/dsm/domain/show_NIS_domain/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 测试NIS域IP是否可达 http://127.0.0.1/dsm/domain/test_NIS_domain/ POST /dsm/domain/test_NIS_domain/ */
export async function dsmDomainTestNisDomain(
  body: {
    /** 集群id */
    cluster_id?: string;
    /** NIS域服务IP */
    NIS_domain_server_ip?: string;
    /** 操作记录需要该参数,因测试NIS域仅需IP，因此此时的操作对象为NIS域IP */
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.testNISdomain & API.RequestExtend>('/dsm/domain/test_NIS_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** NAS节点退出NIS域 http://127.0.0.1/dsm/domain/quit_NIS_domain/ POST /dsm/domain/quit_NIS_domain/ */
export async function dsmDomainQuitNisDomain(
  body: {
    /** 集群ID */
    cluster_id?: string;
    /** NIS域名，操作记录需要该参数 */
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.quitNISdomain & API.RequestExtend>('/dsm/domain/quit_NIS_domain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
