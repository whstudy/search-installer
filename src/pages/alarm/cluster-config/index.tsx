import { FormattedMessage, useIntl, useModel } from 'umi';
import Request from 'umi-request';
import { useCallback, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { message, Row, Spin } from 'antd';
import { useSafeState } from 'ahooks';
import { isEmpty } from 'lodash';
import { saveAs } from 'file-saver';
import { showMessage } from '@/utils';
import useAsyncCallback from '@/pages/common/useAsyncCallback';
import Empty from './components/Empty';
import Collection from './components/Collection';
import useFetchClusterConfigCollectionRecord from './components/useFetchClusterConfigCollectionRecord';
import {
  dsmClustersConfigCancelCollection,
  dsmClustersConfigCreateCollection,
  dsmClustersConfigCreateDownloadGet,
} from '@/services/dsm/cluster';
import styles from './index.less';
import _ from 'lodash';
import { StorageEmitter } from '@/../config/storageEmitter';

const CancelToken = Request.CancelToken;
let cancel;

const POPUP_KEY = 'popup';
const POPUP_TIMEOUT = 0;
enum ACTION_TYPES {
  COLLECT = 1,
  DOWNLOAD = 2,
}
enum STATUS {
  READY = 0,
  DOWNLOADING = 1,
  COLLECTING = 2,
  DOWNLOAD_CANCELING = 3,
  COLLECT_CANCELING = 4,
}

async function blobDownload(res) {
  if (res.headers.get('Content-type') === 'application/octet-stream') {
    const blob = await res.blob();
    const fileName =
      res.headers
        ?.get('Content-Disposition')
        ?.split(';')?.[1]
        ?.split('filename=')?.[1]
        ?.slice(1, -1) || 'download';
    saveAs(blob, fileName);
  } else {
    const showtype = res.headers.get('showtype');
    const data = await res.json();
    if (showtype === null) {
      message.error(data.msg);
    } else {
      showMessage(+showtype, data.msg, data.code);
    }
  }
}

const ClusterConfig: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id || '';
  const { fetch, loading, clusterConfig } = useFetchClusterConfigCollectionRecord(cluster_id);
  const { start, success, done } = useAsyncCallback();
  const [status, setStatus] = useSafeState<number>(STATUS.READY);
  const typeRef = useRef<number>(0);
  const hidePopup = useRef<any>();

  // show popup for download and collect cluster configuration
  const popup = (loadingMsg, cancelMsg, cancelPromise, cancelParams) => {
    const hide = message.loading({
      content: (
        <div className="logMsgText">
          <span>{loadingMsg}</span>
          <a
            onClick={() => {
              cancelPromise(cancelParams).then((res) => {
                if ((res as any).success) {
                  message.success(res.msg);
                  // 取消配置收集（异步任务）时，需将当亲任务id 从任务 id 队列中删除
                  const jobQueue = JSON.parse(sessionStorage.getItem('globalJobQueue') || '[]');
                  const newJobQueue = _.without(jobQueue, cancelParams?.job_id);
                  sessionStorage.setItem('globalJobQueue', JSON.stringify(newJobQueue));
                  StorageEmitter.emit('storageSetItem');
                }

                hide();

                // trigger re-render after cancel request ready
                setStatus(STATUS.READY);
              });
            }}
          >
            {cancelMsg}
          </a>
        </div>
      ),
      className: styles.logMsgStyle,
      duration: POPUP_TIMEOUT,
      key: POPUP_KEY,
    });

    return hide;
  };

  const cancelDownloadPromise = useCallback(
    (cancelParams) => {
      const downloadCancelSuccessfullyMsg = intl.formatMessage({
        id: 'monitor.clusterConfig.tips.cancelDownload.successfully',
        defaultMessage: '集群配置信息下载取消成功',
      });

      const downloadCancelByUserMsg = intl.formatMessage({
        id: 'action.cancelByUser',
        defaultMessage: '用户主动取消',
      });

      const res = {
        success: true,
        msg: downloadCancelSuccessfullyMsg,
      };

      return new Promise((resolve) => {
        cancel(downloadCancelByUserMsg);
        resolve(res);
      });
    },
    [intl],
  );

  const handleStartJob = useCallback(
    (jobId0Params?) => {
      const collectLoadingMsg = intl.formatMessage({
        id: 'monitor.clusterConfig.tips.collecting',
        defaultMessage: '正在收集集群配置信息',
      });

      const downloadLoadingMsg = intl.formatMessage({
        id: 'monitor.clusterConfig.tips.downloading',
        defaultMessage: '下载集群配置信息',
      });

      const cancelMsg = intl.formatMessage({
        id: 'monitor.clusterConfig.actionCancel',
        defaultMessage: '取消',
      });

      if (typeRef.current === ACTION_TYPES.COLLECT) {
        start(jobId0Params);
        hidePopup.current = popup(collectLoadingMsg, cancelMsg, dsmClustersConfigCancelCollection, {
          cluster_id,
          job_id: jobId0Params,
          name: 'cluster_configuration',
        });
      } else {
        hidePopup.current = popup(downloadLoadingMsg, cancelMsg, cancelDownloadPromise, null);
      }
    },
    [cluster_id, intl, cancelDownloadPromise, start],
  );

  const handleDownload = useCallback(async () => {
    typeRef.current = ACTION_TYPES.DOWNLOAD;
    setStatus(STATUS.DOWNLOADING);

    const params = {
      cluster_id,
      name: 'cluster_configuration',
    };

    handleStartJob();

    const res = await dsmClustersConfigCreateDownloadGet(params, {
      parseResponse: false,
      getResponse: false,

      // should generate token everytime, otherwise download will always fail once canceling download before
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    });

    setStatus(STATUS.READY);

    // save download stream to file
    blobDownload(res);

    // close popup after download request done;
    hidePopup?.current?.();
  }, [cluster_id, handleStartJob, setStatus]);

  const handleCollect = useCallback(async () => {
    typeRef.current = ACTION_TYPES.COLLECT;
    setStatus(STATUS.COLLECTING);

    const params = {
      cluster_id,
      name: 'cluster_configuration',
    };
    const res = await dsmClustersConfigCreateCollection(params);

    if (res.success) {
      handleStartJob(res?.data?.job_id);
    } else {
      res.message.error(res.msg);
    }
  }, [cluster_id, handleStartJob, setStatus]);

  // first fetch cluster config collection record
  useEffect(() => {
    fetch();
  }, [fetch]);

  // collecting cluster config is a async job, done status should close popup and loading status to ready
  useEffect(() => {
    if (done) {
      setStatus(STATUS.READY);
      hidePopup?.current?.();
    }

    // leave current page should close popup too
    return () => {
      hidePopup?.current?.();
    };
  }, [done, setStatus]);

  // collecting cluster config is a async job, success should fetch collection again
  useEffect(() => {
    if (success) {
      fetch();
    }
  }, [success, fetch]);

  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard
        split="horizontal"
        className={styles.config}
        title={
          <Row className="common-page-title">
            <FormattedMessage id="monitor.clusterConfig" defaultMessage="集群配置下载" />
          </Row>
        }
      >
        <Spin spinning={loading}>
          {
            // only render <Empty /> when never collect before
            isEmpty(clusterConfig) ? (
              <Empty
                onCollect={handleCollect}
                loading={[STATUS.COLLECTING, STATUS.COLLECT_CANCELING].includes(status)}
              />
            ) : (
              <Collection
                data={clusterConfig}
                onDownload={handleDownload}
                onCollect={handleCollect}
                loading={[
                  STATUS.COLLECTING,
                  STATUS.COLLECT_CANCELING,
                  STATUS.DOWNLOADING,
                  STATUS.DOWNLOAD_CANCELING,
                ].includes(status)}
              />
            )
          }
        </Spin>
      </ProCard>
    </PageContainer>
  );
};

export default ClusterConfig;
