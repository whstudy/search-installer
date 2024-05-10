import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { ResponseError, RequestOptionsInit } from 'umi-request';
import { history, getLocale } from 'umi';
import type { Context } from 'umi-request';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
import { message, notification } from 'antd';
import { showMessage } from '@/utils';
import { DynamicallyRedirectPath } from '@/utils/route-helper';
import { StorageEmitter } from '../config/storageEmitter';
import { getIntl } from 'umi';
import { v4 as uuidv4 } from 'uuid';

export const initialStateConfig = {
  loading: <PageLoading />,
};

// TODO: missing getCurrentUser API
const queryCurrentUser = () => {
  return new Promise<API.CurrentUser>((resolve, reject) => {
    const user = localStorage.getItem('user');
    if (user) {
      resolve(JSON.parse(user));
    } else {
      reject();
    }
  });
};

const AuthHeaderInterceptor = (url: string, options: any) => {
  const token = window.localStorage.getItem('token');
  const lang = getLocale();
  const traceid = uuidv4().substr(0, 12);
  const authHeader = {
    Authorization: `Bearer ${token}`,
    'api-version': '2.0',
    'api-lang': lang,
    'source-type': 'ui',
    'X-Trace-Id': `F-${traceid}`,
  };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

// fix dynamically redirect due to pending deployMode, it invokes everytime change route
/*export function onRouteChange({ location }) {
  const deployMode = localStorage.getItem('deployMode') || 'tfs';
  const globalConfig = JSON.parse(localStorage.getItem('globalConfig') || '{}');
  const pathName = location.pathname;
  if (pathName === '/storage') {
    history.push(DynamicallyRedirectPath[deployMode][pathName]);
  }
  //  跳过配置向导后不可再访问配置向导页面
  if (pathName.includes('wizard') && !globalConfig.stateOpenwizard) {
    history.goBack();
  }
}*/

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <></>,
    disableContentMargin: false,
    // footerRender: () => <Footer />,
    onPageChange: () => {
    },
    menuHeaderRender: false,
    ...initialState?.settings,
  };
};
