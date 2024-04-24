import { dsmDomainShowLdapDomainGet } from '@/services/dsm/domain';
import { useCallback, useState } from 'react';
import { useModel } from 'umi';

export default () => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id as string;
  const [infoLoading, setInfoLoading] = useState(false);

  // 域信息
  const getLdapInfo = useCallback(async (handleSuccess?: (res) => void) => {
    try {
      setInfoLoading(true);
      const res = await dsmDomainShowLdapDomainGet({ cluster_id });
      if (res?.success) {
        handleSuccess?.(res);
      }
      return res?.data;
    } finally {
      setInfoLoading(false);
    }
    return null;
  }, []);

  return {
    getLdapInfo,
    infoLoading,
  };
};
