import { useCallback } from 'react';
import { useSafeState } from 'ahooks';
import { dsmClustersConfigGetCollectionGet } from '@/services/dsm/cluster';

export default (cluster_id) => {
  const [loading, setLoading] = useSafeState(false);
  const [clusterConfig, setClusterConfig] = useSafeState();

  const fetch = useCallback(async () => {
    setLoading(true);
    const res = await dsmClustersConfigGetCollectionGet({ cluster_id });

    if (res.success) {
      setClusterConfig(res?.data);
    }

    setLoading(false);
    return res;
  }, [cluster_id, setLoading, setClusterConfig]);

  return {
    loading,
    clusterConfig,
    fetch,
  };
};
