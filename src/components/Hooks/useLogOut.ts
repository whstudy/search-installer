import { portalUserLogoutGet } from '@/services/dsm/login';
import { useModel, history } from 'umi';
import { stringify } from 'querystring';

/**
 * 登入登出等操作
 */
export default () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const logout = async (callback?: () => void) => {
    try {
      const res = await portalUserLogoutGet({ name: currentUser?.name as string });
      if (res?.success) {
        callback && callback();
        const { query = {}, pathname } = history.location;
        const { redirect } = query;
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: pathname,
            }),
          });
        }
      }
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('wizaDefSetting');
      localStorage.removeItem('isCloseUnauthorizedPairTip');
      sessionStorage.removeItem('globalJobQueue');
      sessionStorage.removeItem('globalSearchResoure');
      // ... to be finished
    }
  };

  return {
    logout,
  };
};
