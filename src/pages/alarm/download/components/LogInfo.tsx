import { FormattedMessage } from 'umi';
import { Button, Space, Divider, Typography } from 'antd';
import React from 'react';
import styles from '../index.less';
import IconFont from '@/components/IconFont';
import _ from 'lodash';
import { formatTime, formatUnit } from '@/utils';

const { Text } = Typography;
export type logInfoProps = {
  logInfoData: any;
  setActionMode: (val: string) => void;
  downloadLoading: boolean;
  collectLoading: boolean;
};

const LogInfo: React.FC<logInfoProps> = ({
  logInfoData,
  setActionMode,
  downloadLoading,
  collectLoading,
}) => {
  const { log_info, log_size } = logInfoData || {};
  const getLogSizeTipMsg = (sizeVal) => {
    let msgText;
    const sizeText = <Text type="warning">{formatUnit(sizeVal)}</Text>;

    // formatUnit(10737418240) 10G 大于这个边界值时建议分节点下载
    if (sizeVal > 10737418240) {
      msgText = (
        <FormattedMessage
          id="monitor.logDownload.logSize.largeMsg"
          defaultMessage="当前集群所有日志较大, 一次性收集下载所需时间较长，建议每次选择部分节点日志进行收集"
          values={{ sizeText: sizeText }}
        />
      );
    } else {
      msgText = (
        <FormattedMessage
          id="monitor.logDownload.logSize.smallMsg"
          defaultMessage="当前集群所有日志较小, 请直接收集日志"
          values={{ sizeText: sizeText }}
        />
      );
    }
    return msgText;
  };

  return (
    <>
      {_.isEmpty(log_info) ? (
        <Space size={'middle'} direction="vertical" className={styles.withoutInfoContainer}>
          <IconFont type="icon-jiqunpeizhixinxi" style={{ fontSize: '60px' }} />

          {getLogSizeTipMsg(log_size)}

          <Button
            type="primary"
            ghost
            loading={collectLoading}
            onClick={() => setActionMode('collect')}
          >
            <FormattedMessage id="monitor.clusterConfig.collect" defaultMessage="收集" />
          </Button>
        </Space>
      ) : (
        <Space size={160} className={styles.logInfoContainer}>
          <Space direction="vertical">
            <Space size={'middle'}>
              <IconFont type="icon-jiqunpeizhixinxi" style={{ fontSize: '50px' }} />
              <Space direction="vertical">
                <Text strong>{log_info?.name}</Text>
                <Space size={20}>
                  <Text type="secondary">
                    <FormattedMessage
                      id="monitor.logDownload.logTime"
                      defaultMessage="日志时间"
                      values={{
                        starttime: formatTime(log_info?.starttime),
                        endtime: formatTime(log_info?.endtime),
                      }}
                    />
                  </Text>
                  <Text type="secondary">
                    <FormattedMessage
                      id="monitor.logDownload.logCollectTime"
                      defaultMessage="收集时间"
                      values={{
                        collectTime: formatTime(log_info?.last_collection_time),
                      }}
                    />
                  </Text>
                </Space>
              </Space>
            </Space>

            <Divider />

            <Text>
              <FormattedMessage
                id="monitor.logDownload.logSize.withTipMsg"
                values={{
                  sizeText: getLogSizeTipMsg(log_size),
                }}
              />
            </Text>
          </Space>

          <Space size={16}>
            <Button
              type="primary"
              loading={downloadLoading}
              disabled={collectLoading}
              onClick={() => setActionMode('download')}
            >
              <FormattedMessage id="monitor.clusterConfig.download" defaultMessage="下载" />
            </Button>
            <Button
              type="primary"
              loading={collectLoading}
              ghost
              disabled={downloadLoading}
              onClick={() => setActionMode('reCollect')}
            >
              <FormattedMessage id="monitor.clusterConfig.reCollect" defaultMessage="重新收集" />
            </Button>
          </Space>
        </Space>
      )}
    </>
  );
};

export default LogInfo;
