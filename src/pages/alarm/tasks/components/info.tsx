import { Drawer, Card, Row, Col, List, Tooltip, Spin } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { formatTime } from '@/utils';
import styles from '../index.less';
import IconFont from '@/components/IconFont';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { dsmJobInfoGet } from '@/services/dsm/job';
import { LoadingOutlined } from '@ant-design/icons';

export type parentProps = {
  handleCancel: (val) => void;
  drawerVisible: boolean;
  taskJobId: number;
};
const TaskInfoDrawer: React.FC<parentProps> = (props) => {
  const intl = useIntl();
  const [infoData, setIndexData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getJobInfo = async (jobId: any) => {
    setIsLoading(false);
    const res = await dsmJobInfoGet({ job_id: jobId });
    if ((res as any).success && JSON.stringify(res.data) !== '{}') {
      setIndexData(res.data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (!props.drawerVisible) return;
    getJobInfo(props.taskJobId);
  }, [props.taskJobId, props.drawerVisible]);

  const onClose = () => {
    props.handleCancel(false);
  };
  const titleContent: JSX.Element = (
    <List.Item>
      <List.Item.Meta
        avatar={<IconFont type="icon-renwuliebiaoxiangqing" style={{ fontSize: '40px' }} />}
        title={<FormattedMessage id={`task.${infoData?.job_name}`} />}
        description={`${intl.formatMessage({
          id: 'monitor.taskList.startAt',
          defaultMessage: '开始于',
        })}${formatTime(infoData?.add_time || '-')}`}
      />
      <div className={styles.closeDrawer} onClick={onClose}>
        <CloseOutlined />
      </div>
    </List.Item>
  );
  const statusMap = {
    STARTED: {
      icon: <LoadingOutlined style={{ color: '#2A68BF', fontSize: '1rem', marginRight: '8px' }} />,
      titleMsg: <FormattedMessage id="monitor.taskList.status.doing" defaultMessage="进行中" />,
    },
    SUCCESS: {
      icon: <IconFont type="icon-chenggong" style={{ fontSize: '1rem', marginRight: '8px' }} />,
      titleMsg: <FormattedMessage id="monitor.taskList.status.success" defaultMessage="成功" />,
    },
    FAILURE: {
      icon: <IconFont type="icon-shibai" style={{ fontSize: '1rem', marginRight: '8px' }} />,
      titleMsg: <FormattedMessage id="monitor.taskList.status.failure" defaultMessage="失败" />,
    },
    unexecuted: {
      icon: <i className={styles.unexecuted} />,
      titleMsg: (
        <FormattedMessage id="monitor.taskList.status.unexecuted" defaultMessage="未执行" />
      ),
    },
  };
  const getTaskList = (val) => {
    const { task_list, stage, job_status } = val || {};

    if (task_list?.length === 0) return;
    // const list = task_list?.substring(1,task_list.length-1).split(', ');
    let taskItem;
    if (stage) {
      let isTarget = false;
      taskItem = task_list?.map((item, index) => {
        let msgContent;
        if (item === stage) {
          msgContent = statusMap[job_status];
          isTarget = !isTarget;
        } else {
          isTarget ? (msgContent = statusMap?.unexecuted) : (msgContent = statusMap?.SUCCESS);
        }
        return (
          <List.Item key={index} className={styles.subTaskList}>
            <Tooltip
              placement="top"
              title={msgContent?.titleMsg}
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
            >
              {msgContent?.icon}
              {intl.formatMessage({ id: `task.${item}` })}
            </Tooltip>
          </List.Item>
        );
      });
    } else {
      taskItem = task_list?.map((item, index) => {
        return (
          <List.Item key={index} className={styles.subTaskList}>
            <Tooltip
              placement="top"
              title={<FormattedMessage id="monitor.taskList.status.unexecuted" />}
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
            >
              <i className={styles.unexecuted} />
              {intl.formatMessage({ id: `task.${item}` })}
            </Tooltip>
          </List.Item>
        );
      });
    }
    return taskItem;
  };

  return (
    <>
      <Drawer
        placement="right"
        className={styles.taskInfo}
        width={550}
        destroyOnClose={true}
        visible={props.drawerVisible}
        title={titleContent}
        mask={false}
        closable={false}
      >
        <Card bordered={false}>
          <Spin spinning={!isLoading}>
            <p className={styles.taskInfoTitle}>
              <FormattedMessage id="monitor.taskList.taskInfo" defaultMessage="任务详情" />
            </p>
            <Row>
              <Col span={10}>ID ：</Col>
              <Col span={12}>{infoData?.id}</Col>
            </Row>
            {/* <Row>
              <Col span={10}>Type ID ：</Col>
              <Col span={12}>{infoData?.work_id}</Col>
            </Row> */}
            {/* <Row>
              <Col span={10}>
                <FormattedMessage id="monitor.taskList.operator" defaultMessage="操作者" /> ：
              </Col>
              <Col span={12}>{infoData?.initiator}</Col>
            </Row> */}
            <Row>
              <Col span={10}>
                <FormattedMessage id="monitor.operation.tableTile.status" defaultMessage="状态" />：
              </Col>
              <Col span={12}>
                {statusMap[infoData?.job_status]?.icon}
                {statusMap[infoData?.job_status]?.titleMsg}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <FormattedMessage id="monitor.taskList.durationTime" defaultMessage="持续时间" /> ：
              </Col>
              <Col span={12}>{`${infoData?.duration_time ?? 0}s`}</Col>
            </Row>
            <Row>
              <Col span={10}>
                <FormattedMessage id="monitor.taskList.currentProcess" defaultMessage="执行进程" />
                ：
              </Col>
              <Col span={12}>{getTaskList(infoData)}</Col>
            </Row>
            <Row>
              <Col span={10}>
                <FormattedMessage id="monitor.taskList.executiveRes" defaultMessage="执行结果" /> ：
              </Col>
              <Col span={12}>{infoData?.task_info}</Col>
            </Row>
          </Spin>
        </Card>
      </Drawer>
    </>
  );
};
export default TaskInfoDrawer;
