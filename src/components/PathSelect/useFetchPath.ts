import { useCallback } from 'react';
import { useModel } from 'umi';
import { dsmDirGet } from '@/services/dsm/dir';

const fetch = async (args, defaultPool) => {
  const params = {
    preindex: 1,
    sufindex: 10,
    fuzzy: 'dir_name',
    ...args,
  };
  const res = await dsmDirGet(params);
  if (res.success) {
    if (defaultPool) {
      const dirList = res.data?.items?.filter((v) => v.data_pool === defaultPool);
      return dirList?.map((dir) => {
        return { label: dir.full_path, value: dir.full_path };
      });
    } else {
      return res.data?.items?.map((dir) => {
        return { label: dir.full_path, value: dir.full_path };
      });
    }
  } else {
    return [];
  }
};

export default (defaultPool) => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id || '';

  return useCallback(
    async (path) => {
      if (!/^\//.test(path)) {
        return [];
      }
      // path = path.replace(/\/+$/, '');
      const lindex = path.lastIndexOf('/');
      const parent_path = path.substring(0, lindex) || '/';
      const keyword = path.substring(lindex + 1);
      const options = await fetch({ parent_path, keyword, cluster_id }, defaultPool);
      return options;
    },
    [cluster_id],
  );
};
