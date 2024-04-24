import { dsmDomainShowLdapDomainGet, dsmDomainShowNisDomainGet } from '@/services/dsm/domain';
import { useCallback, useState } from 'react';
import { useModel } from 'umi';
import useAdDomain from './useAdDomain';
import _ from 'lodash';

const DOMAIN_STATUS = ['not_join', 'joining', 'quiting', 'ready', 'error'];

export default () => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id as string;
  const { getAdDomainInfo } = useAdDomain();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('not_join');
  const [activeDomain, setActiveDomain] = useState();

  const getLdapInfo = useCallback(async (handleSuccess?: (res) => void) => {
    try {
      const res = await dsmDomainShowLdapDomainGet({ cluster_id });
      return {
        ...res?.data,
        status: res?.data?.LDAP_domain_status,
      };
    } finally {
    }
  }, []);

  const getNisInfo = useCallback(async (handleSuccess?: (res) => void) => {
    try {
      const res = await dsmDomainShowNisDomainGet({ cluster_id });
      if (res?.success) {
        handleSuccess?.(res);
      }
      return {
        ...res?.data,
        status: res?.data?.NIS_domain_status,
      };
    } finally {
    }
    return null;
  }, []);

  // 域信息
  const getDomainStatus = useCallback(async () => {
    try {
      setLoading(true);
      const [adRes, ldapRes, nisRes] = await Promise.all([
        getAdDomainInfo(),
        getLdapInfo(),
        getNisInfo(),
      ]);
      const res = [adRes, ldapRes, nisRes];
      let domianStatus = '';
      if (res?.[0]?.other_domain === '0') {
        domianStatus = 'not_join';
      } else {
        domianStatus = res?.map((v) => v?.status)?.filter((v) => v !== 'not_join')?.[0];
      }

      setStatus(domianStatus);
      if (domianStatus === 'ready') {
        const domainMapping = {};
        res.forEach((v) => {
          if ('AD_domain_status' in v) {
            domainMapping.ad = v?.status;
          } else if ('LDAP_domain_status' in v) {
            domainMapping.ldap = v?.status;
          } else if ('NIS_domain_status' in v) {
            domainMapping.nis = v?.status;
          }
        });
        setActiveDomain(_.findKey(domainMapping, (s) => s === domianStatus));
      }
    } catch (error) {
      setStatus('not_join');
    } finally {
      setLoading(false);
    }
    return null;
  }, []);

  return {
    getDomainStatus,
    loading,
    isDomainReady: status === 'ready',
    activeDomain,
    status,
  };
};
