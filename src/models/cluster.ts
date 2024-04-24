import { useState, useCallback } from 'react';
import { dsmClustersGetClustersGet as getClusters } from '@/services/dsm/cluster';

export default () => {
  const [clusters, setClusters] = useState<API.querycluster[]>([]);
  const fetchClusters = useCallback(async () => {
    const { data } = await getClusters();
    const items = data!.items!;
    setClusters(items);
    return items;
  }, []);

  return { clusters, fetchClusters };
};
