import useAsyncCallback from '@/pages/common/useAsyncCallback';
import {
  dsmDomainJoinAdDomain,
  dsmDomainModifyAdDomain,
  dsmDomainLeaveAdDomain,
  dsmDomainShowAdDomainGet,
  dsmDomainTestAdDomain,
} from '@/services/dsm/domain';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useModel } from 'umi';

type AdFormValuesType = {
  AD_domain_name: string;
  AD_domain_server_ip: string;
  AD_domain_user_name: string;
  AD_domain_user_pass: string;
};

type QuitFormValuesType = {
  AD_domain_name: string;
};

type TestFormValuesType = {
  AD_domain_name: string;
  AD_domain_server_ip: string;
};

type PasswordFormValuesType = {
  new_password: string;
};

export default () => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id as string;
  const [infoLoading, setInfoLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [quitLoading, setQuitLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const { start, done, success: taskSuccess } = useAsyncCallback();
  const curretnTaskRef = useRef();

  // 域信息
  const getAdDomainInfo = useCallback(
    async (handleSuccess?: (res) => void, handleFailed?: ({ message: string }) => void) => {
      try {
        setInfoLoading(true);
        const res = await dsmDomainShowAdDomainGet({ cluster_id });
        if (res?.success) {
          handleSuccess?.(res);
        } else {
          handleFailed?.({ message: res?.msg });
        }
        return {
          ...res?.data,
          status: res?.data?.AD_domain_status,
        };
      } catch (error) {
        handleFailed?.(error);
      } finally {
        setInfoLoading(false);
      }
      return null;
    },
    [],
  );

  // 加域: 异步
  const addAdDomain = useCallback(async (adFormValues: AdFormValuesType) => {
    let result = false;
    try {
      setAddLoading(true);
      const res = await dsmDomainJoinAdDomain({
        cluster_id,
        name: adFormValues?.AD_domain_name,
        ...adFormValues,
      });
      result = !!res?.success;
      if (res?.success && res?.data?.job_id) {
        curretnTaskRef.current = 'addAdDomain';
        start(res?.data?.job_id);
      } else {
        setAddLoading(false);
        res?.message?.error?.(res?.msg);
      }
    } finally {
      return result;
    }
  }, []);

  // 退域
  const quitAdDomain = useCallback(async (quitFormValues: QuitFormValuesType) => {
    let result = false;
    try {
      setQuitLoading(true);
      const res = await dsmDomainLeaveAdDomain({
        cluster_id,
        name: quitFormValues?.AD_domain_name,
      });
      const { success, msg } = res || {};
      result = !!success;
      if (success && res?.data?.job_id) {
        curretnTaskRef.current = 'quitAdDomain';
        start(res?.data?.job_id);
      } else {
        setQuitLoading(false);
        res?.message?.error?.(msg);
      }
    } finally {
      return result;
    }
  }, []);

  // 测试加域IP
  const testAdDomain = useCallback(async (testFormValues: TestFormValuesType) => {
    try {
      setTestLoading(true);
      const {
        success,
        message: resMsg,
        msg,
      } = await dsmDomainTestAdDomain({
        cluster_id,
        name: testFormValues?.AD_domain_name,
        ...testFormValues,
      });
      resMsg?.[success ? 'success' : 'error']?.(msg);
    } finally {
      setTestLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (passwordFormValues: PasswordFormValuesType) => {
    try {
      setPwdLoading(true);
      const { new_password } = passwordFormValues || {};
      const {
        success,
        message: resMsg,
        msg,
      } = (await dsmDomainModifyAdDomain({
        new_password,
      })) || {};
      resMsg?.[success ? 'success' : 'error']?.(msg);
    } finally {
      setPwdLoading(false);
    }
  }, []);

  useEffect(() => {
    if (done) {
      setAddLoading(false);
      setQuitLoading(false);
    }
  }, [done]);

  return {
    getAdDomainInfo,
    addAdDomain,
    quitAdDomain,
    testAdDomain,
    updatePassword,
    infoLoading,
    addLoading,
    testLoading,
    quitLoading,
    pwdLoading,
    currentTask: { task: curretnTaskRef.current, success: taskSuccess, done },
  };
};
