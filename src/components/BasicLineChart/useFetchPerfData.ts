import { useCallback } from 'react';
import { useModel } from 'umi';
import { DefaultPerfQueryParams, NicQueryParams, DirQosPerfQueryParams } from './data';
import { dsmDirQosPerfGet } from '@/services/dsm/dirQos';
import { dsmPerfGet } from '@/services/dsm/perf';
import { dsmHostNicperfGet } from '@/services/dsm/host';

const useFetchPerfData = () => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id as string;

  const fetchDefaultPerf = useCallback(async (queryParams: DefaultPerfQueryParams) => {
    let perfData;
    try {
      const res = await dsmPerfGet({
        cluster_id,
        ...queryParams,
      });
      if ((res as any)?.success) {
        perfData = {
          success: true,
          data: res?.data,
        };
      }
    } finally {
      if (!perfData) {
        return { success: false, data: [] };
      }
      return perfData;
    }
  }, []);

  const fetchDirQosPerf = useCallback(async (queryParams: DirQosPerfQueryParams) => {
    let perfData;
    try {
      const res = await dsmDirQosPerfGet({
        cluster_id,
        monitor_db: 'dir_qos',
        ...queryParams,
      });
      if ((res as any)?.success) {
        perfData = {
          success: true,
          data: res?.data,
        };
      }
    } finally {
      if (!perfData) {
        return { success: false, data: [] };
      }
      return perfData;
    }
  }, []);

  const fetchNicPerf = useCallback(async (queryParams: NicQueryParams) => {
    let perfData;
    try {
      const res = await dsmHostNicperfGet({
        cluster_id,
        ...queryParams,
      });
      if ((res as any)?.success) {
        perfData = {
          success: true,
          data: res?.data,
        };
      }
    } finally {
      if (!perfData) {
        return { success: false, data: [] };
      }
      return perfData;
    }
  }, []);

  return {
    fetchDefaultPerf,
    fetchDirQosPerf,
    fetchNicPerf,
  };
};

export default useFetchPerfData;
