// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取登录配置 http://127.0.0.1/dsm/login/config/get_configure/ GET /portal/login/config/get_configure/ */
export async function portalLoginConfigGetConfigureGet(options?: { [key: string]: any }) {
  return request<API.loginConfig & API.RequestExtend>('/portal/login/config/get_configure/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置登陆配置 http://127.0.0.1/dsm/login/config/set_configure/ POST /portal/login/config/set_configure/ */
export async function portalLoginConfigSetConfigure(
  body: {
    /** 登陆锁定时间 */
    LOGIN_LOCK_TIME: number;
    /** 登陆错误次数锁定:最低5次 */
    LOGIN_LOCK_COUNT: number;
    /** token过期时间 */
    LOGIN_OBSERVATION_TIME: number;
    /** 集群名字，操作记录需要该参数 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.setloginConfig & API.RequestExtend>('/portal/login/config/set_configure/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 http://127.0.0.1/portal/login/ POST /portal/login/ */
export async function portalLogin(
  body: {
    /** 账号 */
    username: string;
    /** 密码 */
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.login & API.RequestExtend>('/portal/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出 http://127.0.0.1/dsm/view/user/logout/ GET /portal/user/logout/ */
export async function portalUserLogoutGet(
  params?: {
    // query
    /** 用户名,操作记录对象名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.logout & API.RequestExtend>('/portal/user/logout/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
