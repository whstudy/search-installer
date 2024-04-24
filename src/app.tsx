import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { ResponseError, RequestOptionsInit } from 'umi-request';
import { history, getLocale } from 'umi';
import type { Context } from 'umi-request';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
import { dsmClustersGetClustersGet as getClusters } from '@/services/dsm/cluster';
import { message, notification } from 'antd';
import { showMessage } from '@/utils';
import { DynamicallyRedirectPath } from '@/utils/route-helper';
import { StorageEmitter } from '../config/storageEmitter';
import { getIntl } from 'umi';
import { v4 as uuidv4 } from 'uuid';

const loginPath = '/user/login';

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

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  clusters?: API.querycluster[];
  currentCluster?: API.querycluster;
  currentUser?: API.CurrentUser;
  globalConfig?: API.GlobalConfig;
  deployMode?: string[];
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchClusterInfo?: () => Promise<API.querycluster[] | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const user = await queryCurrentUser();
      return user;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const fetchClusterInfo = async () => {
    try {
      const { data } = await getClusters();
      return data;
    } catch (error) {
      // throw error;
    }
    return undefined;
  };

  if (history.location.pathname !== loginPath) {
    const [currentUser, clusters] = await Promise.all([fetchUserInfo(), fetchClusterInfo()]);
    const deployMode = localStorage.getItem('deployMode')?.split('_') || ['tfs'];
    const globalConfig = JSON.parse(localStorage.getItem('globalConfig') || '{}');
    const currentCluster = clusters?.find((c) => c.is_local);
    return {
      fetchUserInfo,
      fetchClusterInfo,
      settings: {},
      currentUser,
      currentCluster,
      clusters,
      deployMode,
      globalConfig,
    };
  }

  return {
    fetchUserInfo,
    fetchClusterInfo,
    settings: {},
  };
}

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

const UnauthorizedInterceptor = async (response: Response, options: RequestOptionsInit) => {
  if ([401, 403].includes(response.status) && !options.ignoreNoAuth) {
    sessionStorage.removeItem('globalSearchResoure');
    history.push(loginPath);
  }
  return response;
};

export const request: RequestConfig = {
  getResponse: true,
  skipErrorHandler: true,
  requestInterceptors: [AuthHeaderInterceptor],
  responseInterceptors: [UnauthorizedInterceptor],
  middlewares: [
    async (ctx: Context, next: () => void) => {
      await next();
      if (ctx.req.options.parseResponse === false) {
        return;
      }
      const { data, response } = ctx.res;
      const showtype = response.headers.get('showtype');
      const { code, msg } = data;
      const success = code === '0';
      const job_id = data?.data?.job_id;
      if (showtype === null) {
        if (job_id) {
          const jobQueueStr = sessionStorage.getItem('globalJobQueue');
          let jobQueue = jobQueueStr ? JSON.parse(jobQueueStr) : [];
          jobQueue =
            jobQueue.filter((item) => item === job_id)?.length > 0
              ? jobQueue
              : [...jobQueue].concat([job_id]);
          sessionStorage.setItem('globalJobQueue', JSON.stringify(jobQueue));
          StorageEmitter.emit('storageSetItem');
        }
        ctx.res = { ...data, success, message, notification };
      } else {
        showMessage(+showtype, msg, code);
        ctx.res = { ...data, success, message: null, notification: null };
      }
    },
  ],
  errorHandler: (error: ResponseError) => {
    const { response, data } = error;
    const status = response && response.status ? response.status : -1;
    if (status >= 400 && ![401, 403].includes(status)) {
      const description = data ? JSON.stringify(data) : 'Request error, please retry.';
      if (status === 429) {
        notification.error({
          message: getIntl().formatMessage({ id: 'pages.login.failure.lock' }),
        });
      } else {
        notification.error({
          message: `${status} ${response.statusText}`,
          description,
        });
      }
    } else {
      throw error;
    }
  },
};

// fix dynamically redirect due to pending deployMode, it invokes everytime change route
export function onRouteChange({ location }) {
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
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
