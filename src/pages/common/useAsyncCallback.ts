import { useCallback, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { dsmJobInfoGet } from '@/services/dsm/job';

const FAILURE_STATUS = ['BROKEN', 'FAILURE', 'REVOKED', 'INVALID', 'GOLOST', 'OVERDUE'];
const SUCCESS_STATUS = ['SUCCESS'];

export default (
  callback?: (success: boolean, job: API.queryJobInfo['data']) => void,
  interval?: number,
) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [nextJobId, setNextJobId] = useState<any>(null);
  const fetch = (job_id) => dsmJobInfoGet({ job_id }, { ignoreNoAuth: true });
  const {
    data: res,
    loading: polling,
    run,
    cancel: stop,
  } = useRequest(fetch, {
    manual: true,
    pollingInterval: interval || 3000,
    pollingWhenHidden: false,
  });

  const start = useCallback((job_id) => {
    setDone(false);
    setSuccess(false);
    run(job_id);
  }, []);

  /**
   * 当nextJobId存在时开始下一次的状态轮询
   */
  useEffect(() => {
    if (nextJobId) {
      start(nextJobId);
    }
  }, [nextJobId]);

  useEffect(() => {
    if (!res?.success) {
      return;
    }
    const { job_status = '' } = res.data || {};
    const DONE = [...FAILURE_STATUS, ...SUCCESS_STATUS].includes(job_status);
    const SUCCESS = SUCCESS_STATUS.includes(job_status);
    if (DONE) {
      setDone(DONE);
      setSuccess(SUCCESS);
      stop();
      callback && callback(SUCCESS, res.data);
      setNextJobId(res.data?.next_job_id);
    }
  }, [res]);

  return { polling, done, success, start, stop };
};
