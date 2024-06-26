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

export const request: RequestConfig = {
  getResponse: true,
  skipErrorHandler: true,
  middlewares: [
    async (ctx: Context, next: () => void) => {
      await next();
      if (ctx.req.options.parseResponse === false) {
        return;
      }
      const { data, response } = ctx.res;
      const showtype = response.headers.get('showtype');
      const { msg } = data;
      const code = data.error_code || '0'
      const success = code === '0';
      if (showtype === null) {
        ctx.res = { data, success, message, notification };
      } else {
        showMessage(+showtype, msg, code);
        ctx.res = { data, success, message: null, notification: null };
      }
    },
  ],
  errorHandler: (error: ResponseError) => {
    const { response, data } = error;
    const status = response && response.status ? response.status : -1;
    if (status >= 400 && ![401, 403].includes(status)) {
      const description = data ? JSON.stringify(data) : 'Request error, please retry.';
      if (status === 429) {
        // 登录锁定时间是个变化值，需从返回值中提取
        const numbers = data?.detail.match(/\d+/g);
        notification.error({
          message: getIntl().formatMessage(
            { id: 'pages.login.failure.lock' },
            { numbers: numbers[0] },
          ),
        });
      } else if (status === 404) {
        notification.error({
          message: getIntl().formatMessage({ id: 'pages.404Error' }),
        });
      } else if (status === 500) {
        notification.error({
          message: getIntl().formatMessage({ id: 'pages.500Error' }),
          description: getIntl().formatMessage({ id: 'pages.tryLater' }),
        });
      } else if (status === 504) {
        notification.error({
          message: getIntl().formatMessage({ id: 'pages.504Error' }),
          description: getIntl().formatMessage({ id: 'pages.tryLater' }),
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
    disableContentMargin: true,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    // 不展示顶栏
    headerRender: false,
    // footerRender: () => <Footer />,
    onPageChange: () => {
    },
    ...initialState?.settings,
  };
};
