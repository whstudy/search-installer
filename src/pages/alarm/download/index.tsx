import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useModel, useIntl } from 'umi';
import { message, Row, Spin } from 'antd';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
import LogInfo from './components/LogInfo';
import CollectionLogAction from './components/CollectionLogAction';
import { dsmLogGet, dsmLogCollectionCancel, dsmLogDownloadGet } from '@/services/dsm/log';
import { useSafeState } from 'ahooks';
import useAsyncCallback from '@/pages/common/useAsyncCallback';
import _ from 'lodash';
import { StorageEmitter } from '@/../config/storageEmitter';

let controller;

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

const LogDownloadAlarm: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const [logInfoLoading, setLogInfoLoading] = useState<boolean>(false);
  const [logInfoData, setLogInfoData] = useState<any>('');
  const [actionMode, setActionMode] = useState<string>('');
  const [status, setStatus] = useSafeState<number>(STATUS.READY);
  const [collectDrawerVisible, setCollectDrawerVisible] = useState<boolean>(false);
  const { start, success, done } = useAsyncCallback();
  const typeRef = useRef<number>(0);
  const hidePopup = useRef<any>();
  const history = useHistory();

  const collectLoadingMsg = intl.formatMessage({
    id: 'monitor.logDownload.loading.collecting',
    defaultMessage: '正在收集日志信息',
  });

  const downloadLoadingMsg = intl.formatMessage({
    id: 'monitor.logDownload.loading.downloading',
    defaultMessage: '正在收集日志信息',
  });

  const cancelDownloadPromise = useCallback(
    (cancelParams) => {
      const downloadCancelSuccessfullyMsg = intl.formatMessage({
        id: 'monitor.logDownload.loading.cancelDownload',
        defaultMessage: '集群日志信息下载取消成功',
      });

      const res = {
        success: true,
        msg: downloadCancelSuccessfullyMsg,
      };

      // cancel download
      controller?.abort();

      return new Promise((resolve) => {
        resolve(res);
      });
    },
    [intl, controller],
  );

  const popup = (jobIdParams?) => {
    let cancelPromise;
    let loadingMsg;
    let paramValue;
    if (typeRef.current === ACTION_TYPES.COLLECT) {
      loadingMsg = collectLoadingMsg;
      cancelPromise = dsmLogCollectionCancel;
      paramValue = {
        cluster_id: clusterId,
        job_id: jobIdParams,
        name: 'log_download',
      };
    } else {
      loadingMsg = downloadLoadingMsg;
      cancelPromise = cancelDownloadPromise;
      paramValue = null;
    }

    const hide = message.loading({
      content: (
        <div className="logMsgText">
          <span>{loadingMsg}</span>
          <a
            onClick={() => {
              cancelPromise(paramValue).then((res) => {
                if ((res as any).success) {
                  message.success(res.msg);
                  if (typeRef.current === ACTION_TYPES.COLLECT) {
                    // 取消日志收集（异步任务）时，需将当亲任务id 从任务 id 队列中删除
                    const jobQueueStr = sessionStorage.getItem('globalJobQueue');
                    let jobQueue = jobQueueStr ? JSON.parse(jobQueueStr) : [];
                    jobQueue = _.without(jobQueue, jobIdParams);
                    sessionStorage.setItem('globalJobQueue', JSON.stringify(jobQueue));
                    StorageEmitter.emit('storageSetItem');
                  }
                }

                hide();

                // after cancel request ready
                setStatus(STATUS.READY);
              });
            }}
          >
            {intl.formatMessage({
              id: 'component.button.cancelText',
              defaultMessage: '取消',
            })}
          </a>
        </div>
      ),
      className: styles.logMsgStyle,
      duration: 0,
      key: actionMode,
    });

    return hide;
  };

  const afterCollect = (val) => {
    typeRef.current = ACTION_TYPES.COLLECT;
    setStatus(STATUS.COLLECTING);
    val && start(val);
    hidePopup.current = popup(val);
  };

  const handleDownload = useCallback(async () => {
    typeRef.current = ACTION_TYPES.DOWNLOAD;
    setStatus(STATUS.DOWNLOADING);

    const params = {
      cluster_id: clusterId,
      name: 'log_download',
    };

    setActionMode('');
    hidePopup.current = popup();
    controller = new AbortController();
    const signal = controller.signal;

    const res = await dsmLogDownloadGet(params, { signal });
    if (res.success) {
      hidePopup?.current?.();
      setStatus(STATUS.READY);
      const fakeLink = document.createElement('a');
      fakeLink.href = res.data;
      fakeLink.style.display = 'none';
      document.body.appendChild(fakeLink);
      fakeLink.click();
      document.body.removeChild(fakeLink);
    } else {
      hidePopup?.current?.();
      setStatus(STATUS.READY);
      message.error(res.msg);
    }
  }, [clusterId, setStatus]);

  const getLogInfo = async () => {
    setLogInfoLoading(true);
    try {
      const resp = await dsmLogGet({
        cluster_id: clusterId,
      });

      setLogInfoLoading(false);
      if (resp.success) {
        setLogInfoData(resp?.data);
        return true;
      }

      return false;
    } catch (error) {
      setLogInfoLoading(false);
      return false;
    }
  };

  useEffect(() => {
    getLogInfo();
  }, []);

  useEffect(() => {
    if (['collect', 'reCollect'].includes(actionMode)) {
      setCollectDrawerVisible(true);
    } else if (['download'].includes(actionMode)) {
      handleDownload();
    } else if (['cancelCollectDrawer'].includes(actionMode)) {
      setCollectDrawerVisible(false);
    }
  }, [actionMode]);

  useEffect(() => {
    if (success || done) {
      setStatus(STATUS.READY);
      hidePopup?.current?.();
      getLogInfo();
    }
  }, [success, done, setStatus]);

  /**
   * 收集是异步任务，所以在当前loading是收集时，离开页面取消弹框
   * 下载是同步任务，所以在离开时不取消loading框
   */
  useEffect(() => {
    return () => {
      history.listen((location, action) => {
        // history.listen 取消监听路由变化，避免内存泄漏
        if (action === 'POP') {
          hidePopup?.current?.();
        }
      });

      //
      if (typeRef.current === ACTION_TYPES.COLLECT) {
        hidePopup?.current?.();
      }
    };
  }, [history]);

  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard
        split="horizontal"
        className={styles.container}
        title={
          <Row className="common-page-title">
            <FormattedMessage id="menu.alarm.logDownload" defaultMessage="集群日志下载" />
          </Row>
        }
      >
        <Spin
          spinning={logInfoLoading}
          tip={
            <FormattedMessage
              id="monitor.logDownload.loading.tip"
              defaultMessage="正在估算日志大小"
            />
          }
        >
          {logInfoLoading ? (
            <></>
          ) : (
            <LogInfo
              logInfoData={logInfoData}
              setActionMode={setActionMode}
              downloadLoading={[STATUS.DOWNLOADING, STATUS.DOWNLOAD_CANCELING].includes(status)}
              collectLoading={[STATUS.COLLECTING, STATUS.COLLECT_CANCELING].includes(status)}
            />
          )}
        </Spin>

        {collectDrawerVisible && (
          <CollectionLogAction
            afterOperation={afterCollect}
            actionMode={actionMode}
            setActionMode={setActionMode}
          />
        )}
      </ProCard>
    </PageContainer>
  );
};

export default LogDownloadAlarm;
