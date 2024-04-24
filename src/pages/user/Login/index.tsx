import { Alert, message, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import * as Lodash from 'lodash';
import { Base64 } from 'js-base64';
import Footer from '@/components/Footer';
import { portalLogin } from '@/services/dsm/login';

import styles from './index.less';
import { dsmRelationshipCapabilityGet } from '@/services/dsm/replication';
import { setLocale } from '@@/plugin-locale/localeExports';
import { useLocalStorageState } from 'ahooks';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

// 判断是否具备复制能力
const fetchRepCapability = async (cluster_id) => {
  const repCapabilityRes = await dsmRelationshipCapabilityGet({
    cluster_id,
  });
  return repCapabilityRes?.data?.relationship_creation;
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [fromDeploy, setFromDeploy] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.login & API.RequestExtend>();
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchInitialInfo = async () => {
    const [currentUser, clusters] = await Promise.all([
      initialState?.fetchUserInfo?.(),
      initialState?.fetchClusterInfo?.(),
    ]);

    const currentCluster = clusters?.find((c) => c.is_local);
    const deployMode = localStorage.getItem('deployMode')?.split('_') || ['tfs'];

    // 保存复制能力标识，供未授权弹框使用
    const isHasRepCapability = await fetchRepCapability(currentCluster?.id);
    localStorage.setItem('hasRepCapability', String(isHasRepCapability));
    const globalConfig = JSON.parse(localStorage.getItem('globalConfig') || '{}');

    if (currentUser) {
      await setInitialState((s) => ({
        ...s,
        currentUser,
        currentCluster,
        clusters,
        deployMode,
        globalConfig,
      }));
    }
  };

  const formatDeployMode = useCallback((mode: string) => {
    let result = 'tfs';
    const modes = ['tfs', 'tos', 'tfs_tos'];
    if (!Lodash.isEmpty(mode)) {
      if (modes.includes(mode)) {
        result = mode;
      }
    }
    return result;
  }, []);

  const handleSubmit = async (values: API.LoginParams) => {
    localStorage.removeItem('deployRedirect');
    setSubmitting(true);
    try {
      const result = await portalLogin({
        username: values.username,
        password: Base64.encode(values.password),
      });
      const { data } = result;
      if ((result as any).success) {
        // const defaultLoginSuccessMessage = intl.formatMessage({
        //   id: 'pages.login.success',
        //   defaultMessage: '登录成功！',
        // });
        // message.success(defaultLoginSuccessMessage);
        const user = data?.user;
        const jwt = data!.jwt!;
        const licenseCluster = data?.license_cluster;
        const licenseNodes = data?.license_nodes;
        const featurePACS = data?.feature_pacs;
        const featureTiering = data?.feature_tiering;
        const featureHDFS = data?.feature_hdfs;
        const stateRgwReady = data?.state_rgw_ready;
        const statePwdChanged = data?.state_pwd_changed;
        const stateOpenwizard = data?.state_openwizard;
        const rgwCacheEnabled = data?.rgw_cache_enabled; // 是否开启高速缓存
        const deployMode = formatDeployMode(data?.deploy_mode);

        const currentUser = {
          ...user,
          name: user?.username,
          licenseCluster,
          licenseNodes,
        };
        const globalConfig = {
          featurePACS,
          featureTiering,
          featureHDFS,
          stateRgwReady,
          statePwdChanged,
          stateOpenwizard,
          rgwCacheEnabled,
        };

        localStorage.setItem('user', JSON.stringify(currentUser));
        localStorage.setItem('token', jwt);
        localStorage.setItem('visitTime', '0'); // 进入页面，用于 RightContent 组件
        localStorage.setItem('deployMode', deployMode);
        localStorage.setItem('globalConfig', JSON.stringify(globalConfig));
        localStorage.removeItem('wizardObjConfigStatus');
        await fetchInitialInfo();

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        let redirectUrl = redirect; // 当从配置向导处退出登录，但集群已通过其他方式跳过配置向导时，不再进入配置向导
        if (redirect?.includes('wizard')) {
          redirectUrl = !stateOpenwizard ? '/dashboard' : '/wizard';
        }
        history.push(redirectUrl || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setFromDeploy(false); // 登录失败后取消 loading
      message.error(result.msg);
      setUserLoginState(result);
    } catch (error) {
      // const defaultloginFailureMessage = intl.formatMessage({
      //   id: 'pages.login.failure',
      //   defaultMessage: '登录失败，请重试！',
      // });
      // message.error(defaultloginFailureMessage);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    const { query } = history.location;
    const { p, e, source, type } = query as { redirect: string };
    e && setLocale(e, true);
    if (source === 'cluster') {
      const typeValue = type && Base64.decode(type).split('&&');
      setFromDeploy(true);
      handleSubmit({
        username: typeValue?.[0],
        password: typeValue?.[1],
      });
    } else if (!!p) {
      setFromDeploy(true);
      handleSubmit({
        username: `admin`,
        password: `passw0rd`,
        // username: `magnascale_cli`,
        // password: `MagnaScalePassw0rd`,
      });
      localStorage.setItem('deployRedirect', '1');
    }
  }, []);
  const success = userLoginState?.success;

  return (
    <div>
      {fromDeploy ? (
        <div className={styles.fromDeploy}>
          <Spin></Spin>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.lang} data-lang>
            {SelectLang && <SelectLang />}
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <div>
                    <img src="lenovo.svg" alt="" className={styles.lenovo} />
                  </div>
                  <img alt="logo" className={styles.logo} src="/logo-font.svg" />
                </Link>
              </div>
            </div>

            <div className={styles.main}>
              <ProForm
                initialValues={{
                  autoLogin: true,
                  username: '',
                  password: '',
                }}
                isKeyPressSubmit={true}
                submitter={{
                  searchConfig: {
                    submitText: intl.formatMessage({
                      id: 'pages.login.submit',
                      defaultMessage: '登录',
                    }),
                  },
                  render: (_, dom) => dom.pop(),
                  submitButtonProps: {
                    loading: submitting,
                    size: 'large',
                    style: {
                      width: '100%',
                    },
                  },
                }}
                onFinish={async (values) => {
                  handleSubmit(values as API.LoginParams);
                }}
              >
                {success && (
                  <LoginMessage
                    content={intl.formatMessage({
                      id: 'pages.login.accountLogin.errorMessage',
                      defaultMessage: '账户或密码错误',
                    })}
                  />
                )}

                <ProFormText
                  name="username"
                  // fieldProps={{
                  //   size: 'large',
                  //   prefix: <UserOutlined className={styles.prefixIcon} />,
                  // }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名: admin or user',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="用户名是必填项！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  // fieldProps={{
                  //   size: 'large',
                  //   prefix: <LockOutlined className={styles.prefixIcon} />,
                  // }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码: admin',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </ProForm>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Login;
