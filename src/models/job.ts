import { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import { dsmJobStatusGet } from '@/services/dsm/job';
import { StorageEmitter } from '../../config/storageEmitter';

const RunningJobStatus = ['STARTED', 'PENDING'];
const FinishedJobStatus = [
  'GOLOST',
  'OVERDUE',
  'STAYREVOKED',
  'SUCCESS',
  'REVOKED',
  'BROKEN',
  'FAILURE',
  'INVALID',
];

export default () => {
  // 进行态任务集合
  const [globalJobQueue, setGlobalJobQueue] = useState(
    JSON.parse(sessionStorage.getItem('globalJobQueue') || '[]'),
  );

  // 完成任务ID
  const [jobIdsSuccess, setJobIdsSuccess] = useState<any>([]);

  /**
   * 显示任务完成/失败 通知
   * @param messageAPI
   * @param jobStatus
   * @param descInfo   stage 异步任务中当前进程，task_info 任务失败原因
   * @param intl
   * @returns
   */
  const showMsgBox = (messageAPI, jobStatus: string, descInfo: any, intl) => {
    const status = jobStatus === 'success' ? 'success' : 'error';

    const taskName = intl.formatMessage({ id: `task.${descInfo?.job_name}` });
    let desc = '';
    if (status === 'success') {
      desc = taskName + intl.formatMessage({ id: `monitor.taskList.status.success` });
    } else {
      desc =
        taskName +
        '：' +
        intl.formatMessage({ id: `task.${descInfo?.stage}` }) +
        intl.formatMessage({ id: 'monitor.taskList.status.failure' }) +
        '，' +
        descInfo?.task_info;
    }
    messageAPI[status](`${desc}`);
    return null;
  };

  // 删除掉session中任务集合的部分job_id, 并更新缓存
  const deleteJobByIds = useCallback((ids: number[]) => {
    // 防止无条件刷新globalJobQueue
    if (!(ids instanceof Array) || !ids?.length) {
      return;
    }
    setJobIdsSuccess(ids)
    const jobQueueStr = sessionStorage.getItem('globalJobQueue');
    let jobQueue = jobQueueStr ? JSON.parse(jobQueueStr) : [];
    jobQueue = _.reduce(
      jobQueue,
      (a, c) => {
        if (ids.includes(c)) {
          return a;
        }
        return a.concat(c);
      },
      [],
    );
    sessionStorage.setItem('globalJobQueue', JSON.stringify(jobQueue));
    StorageEmitter.emit('storageSetItem');
    return null;
  }, []);

  // 根据缓存拿job结果
  const fetchJobsByIds = useCallback(async (clusterId: string, jobIds: string) => {
    const reqParams = {
      cluster_id: clusterId,
      job_ids: jobIds,
    };
    const { data } = await dsmJobStatusGet(reqParams, { ignoreNoAuth: true });

    // 清除无效id
    // const resIds = data?.map(v => v?.job_id);
    // let job_ids: any = jobIds?.split(',');
    // const lostJob = Array.from(new Set(job_ids?.concat(resIds)))?.filter(v => job_ids?.includes(v) && !resIds?.includes(v));
    // if (lostJob?.length) {
    //   deleteJobByIds(lostJob);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    data?.map((t) => {
      if (t?.job_status === 'SUCCESS' && t?.next_job_id) {
        const jobId = t?.next_job_id;
        const jobQueueStr = sessionStorage.getItem('globalJobQueue');
        let jobQueue = jobQueueStr ? JSON.parse(jobQueueStr) : [];
        jobQueue =
          jobQueue.filter((item) => item === jobId)?.length > 0
            ? jobQueue
            : [...jobQueue].concat([jobId]);
        sessionStorage.setItem('globalJobQueue', JSON.stringify(jobQueue));
        StorageEmitter.emit('storageSetItem');
        return;
      }
    });
    return data;
  }, []);

  // 任务集合缓存发生变化，则更改job_id数据状态
  const storageWatcher = useCallback(() => {
    const item = JSON.parse(sessionStorage.getItem('globalJobQueue') || '[]');
    setGlobalJobQueue(item);
  }, []);

  useEffect(() => {
    StorageEmitter.on('storageSetItem', storageWatcher);
  }, []);

  return {
    FinishedJobStatus,
    RunningJobStatus,
    globalJobQueue,
    fetchJobsByIds,
    deleteJobByIds,
    jobIdsSuccess,
    showMsgBox,
  };
};
