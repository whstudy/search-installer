// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询当前告警 http://127.0.0.1/dsm/alert/current/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/alert/current/ */
export async function dsmAlertCurrentGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 以哪个字段进行排序 */
    sort_field?: string;
    /** 倒序或者正序,desc or asc */
    sort_rule?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 模糊查询的字段，不传用默认 */
    fuzzy?: string;
    /** 模糊查询的字符串 */
    keyword?: string;
    /** 精确查询的字段及字符串 */
    filters?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryAlert & API.RequestExtend>('/dsm/alert/current/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 手动清除告警 http://127.0.0.1/dsm/alert/clear/ POST /dsm/alert/clear/ */
export async function dsmAlertClear(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 当前告警id */
    alert_id: number;
    /** 告警的 alert_title 字段 该参数用于操作记录 */
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.clearAlert & API.RequestExtend>('/dsm/alert/clear/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询历史告警 http://127.0.0.1/dsm/alert/history/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/alert/history/ */
export async function dsmAlertHistoryGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 按字段排序,字段关键字 */
    sort_field?: string;
    /** 正序（asc）、倒序（desc） */
    sort_rule?: string;
    /** 精确查询字段以及字符串 */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 起始时间 */
    start_time?: number;
    /** 终止时间 */
    end_time?: number;
    /** 按告警级别筛选(1,2,3,4,5) */
    severity?: number;
    /** 要模糊查询的字段，不传用默认 */
    fuzzy?: string;
    /** 模糊查询的字符串 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryAlertEvents & API.RequestExtend>('/dsm/alert/history/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出历史告警 http://127.0.0.1/dsm/alert/export/ POST /dsm/alert/export/ */
export async function dsmAlertExport(
  body: {
    /** 集群ID */
    cluster_id: string;
    /** 历史告警开始记录时间 */
    start_time?: number;
    /** 历史告警结束记录时间 */
    end_time?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.exportAlert & API.RequestExtend>('/dsm/alert/export/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询告警配置 http://127.0.0.1/dsm/alert/config/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84&preindex=1&sufindex=10 GET /dsm/alert/config/ */
export async function dsmAlertConfigGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** {"severity": 3} */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 模糊查询字段 */
    fuzzy?: string;
    /** 模糊查询字符串 */
    keyword?: string;
    /** 排序字段 */
    sort_field?: string;
    /** 排序方式, asc, desc */
    sort_rule?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryAlertConf & API.RequestExtend>('/dsm/alert/config/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改告警配置 http://127.0.0.1/dsm/alert/modify/ POST /dsm/alert/modify/ */
export async function dsmAlertModify(
  body: {
    /** 集群ID  */
    cluster_id: string;
    /** 告警配置id  */
    id: number;
    /** 告警阈值 */
    threshold: number;
    /** 告警状态 开启or关闭 (1or0) */
    alert_enabled: number;
    /** 告警级别 */
    severity: number;
    /** 告警配置项的description字段,该参数用于操作记录 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.confAlert & API.RequestExtend>('/dsm/alert/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改SNMPv3告警转发配置 http://127.0.0.1/dsm/alert/set_snmpv3_config/ POST /dsm/alert/set_snmpv3_config/ */
export async function dsmAlertSetSnmpv3Config(
  body: {
    /** 认证协议  */
    authproto: string;
    /** 认证密码  */
    password: string;
    /** 加密算法  */
    encrptAlgo: string;
    /** 加密密码  */
    encrptPass: string;
    /** SNMPv3 trap服务器IP或域名 */
    ip: string;
    /** SNMPv3 trap 服务器监听端口号 */
    port: number;
    /** 用户名  */
    username: string;
    /** 是否启用SNMPv3 告警转发  */
    enable: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.setSnmpv3 & API.RequestExtend>('/dsm/alert/set_snmpv3_config/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取SNMPv3告警转发配置 http://127.0.0.1/dsm/alert/get_snmpv3_config/ GET /dsm/alert/get_snmpv3_config/ */
export async function dsmAlertGetSnmpv3ConfigGet(options?: { [key: string]: any }) {
  return request<API.getSnmpv3 & API.RequestExtend>('/dsm/alert/get_snmpv3_config/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改SMTP告警转发配置 http://127.0.0.1/dsm/alert/set_smtp_config/ POST /dsm/alert/set_smtp_config/ */
export async function dsmAlertSetSmtpConfig(
  body: {
    /** 是否启动SMTP邮件服务器身份认证  */
    auth: string;
    /** 发件人邮箱  */
    email: string;
    /** 加密连接方式  */
    encrypt: string;
    /** SMTP服务器地址  */
    host: string;
    /** 语言 */
    lang: string;
    /** 用户名 */
    name: string;
    /** 密码  */
    password: string;
    /** SMTP 服务器监听端口号 */
    port: number;
    /** 是否启用SMTP 告警转发  */
    enable: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.setSmtpConf & API.RequestExtend>('/dsm/alert/set_smtp_config/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 测试SMTP告警转发配置 http://127.0.0.1/dsm/alert/set_smtp_config/ POST /dsm/alert/test_smtp_config/ */
export async function dsmAlertTestSmtpConfig(
  body: {
    /** 是否启动SMTP邮件服务器身份认证  */
    auth: string;
    /** 发件人邮箱  */
    email: string;
    /** 加密连接方式  */
    encrypt: string;
    /** SMTP服务器地址  */
    host: string;
    /** 语言 */
    lang: string;
    /** 用户名 */
    name: string;
    /** 密码  */
    password: string;
    /** SMTP 服务器监听端口号 */
    port: number;
    /** 是否启用SMTP 告警转发  */
    enable: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.testSmtpConf & API.RequestExtend>('/dsm/alert/test_smtp_config/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取SMTP告警转发配置 http://127.0.0.1/dsm/alert/get_smtp_config/ GET /dsm/alert/get_smtp_config/ */
export async function dsmAlertGetSmtpConfigGet(options?: { [key: string]: any }) {
  return request<API.getSmtpConf & API.RequestExtend>('/dsm/alert/get_smtp_config/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置SMTP告警接收邮箱 http://127.0.0.1/dsm/alert/conf_smtp_mail/ POST /dsm/alert/conf_smtp_mail/ */
export async function dsmAlertConfSmtpMail(
  body: {
    /** 接收告警邮箱地址  */
    email: string;
    level: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.setSmtpMail & API.RequestExtend>('/dsm/alert/conf_smtp_mail/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除SMTP告警接收邮箱 http://127.0.0.1/dsm/alert/del_smtp_mail/ POST /dsm/alert/del_smtp_mail/ */
export async function dsmAlertDelSmtpMail(
  body: {
    /** 删除邮箱的ID  */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.delSmtpMail & API.RequestExtend>('/dsm/alert/del_smtp_mail/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取SMTP告警接收邮箱 http://127.0.0.1/dsm/alert/get_smtp_mails/ GET /dsm/alert/get_smtp_mails/ */
export async function dsmAlertGetSmtpMailsGet(
  params?: {
    // query
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 要排序的字段 */
    sort_field?: string;
    /** 排序规则正序倒序,asc,desc */
    sort_rule?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.getSmtpMail & API.RequestExtend>('/dsm/alert/get_smtp_mails/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看当前告警各状态数量 http://127.0.0.1/ui/summary/operationrecordsummary/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84& GET /ui/summary/current_alert_summary/ */
export async function uiSummaryCurrentAlertSummaryGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.currentAlertSummary & API.RequestExtend>(
    '/ui/summary/current_alert_summary/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查看历史告警各状态数量 http://127.0.0.1/ui/summary/operationrecordsummary/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84& GET /ui/summary/history_alert_summary/ */
export async function uiSummaryHistoryAlertSummaryGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.historyAlertSummary & API.RequestExtend>(
    '/ui/summary/history_alert_summary/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 告警配置各状态数量 http://127.0.0.1/ui/summary/operationrecordsummary/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84& GET /ui/summary/alert_config_summary/ */
export async function uiSummaryAlertConfigSummaryGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.alertConfigSummary & API.RequestExtend>('/ui/summary/alert_config_summary/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
