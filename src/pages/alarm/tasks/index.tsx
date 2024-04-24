import { useIntl, FormattedMessage, useModel } from 'umi';
import React, { useState, useRef, useEffect, Fragment, useCallback } from 'react';
import { Button, Space, Statistic, Divider, Progress, DatePicker, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { RedoOutlined } from '@ant-design/icons';
import { isArray, isEmpty } from 'lodash';
import { formatTime } from '@/utils';
import StatisticTag from '@/components/StatisticTag';
import IconFont from '@/components/IconFont';
import TaskInfoDrawer from './components/info';
import { dsmJobGet, dsmJobCensusGet } from '@/services/dsm/job';
import styles from './index.less';

const { RangePicker } = DatePicker;

function moment2timeStamp(val: any) {
  if (isEmpty(val) || !isArray(val)) {
    return {};
  }
  return {
    start_time: Math.round(new Date(val[0]).getTime() / 1000),
    end_time: Math.round(new Date(val[1]).getTime() / 1000),
  };
}

const AlarmTasks: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const [isRightVisible, setIsRightVisible] = useState<boolean>(false); // 显示右侧抽屉
  const [taskJobId, setTaskJobId] = useState<number>(0);
  const [jobDataMap, setJobDataMap] = useState<any>({});
  const [titleList, setTitleList] = useState<any>([]);
  const { globalJobQueue } = useModel('job');

  // 查询
  const [changeTime, setChangeTime] = useState<any>([]); // 时间容器变化值
  const [queryTime, setQueryTime] = useState<any>(''); // 查询时间

  // 状态栏筛选
  const [statusFliter, setStatusFliter] = useState<any>();

  // 刷新
  const ref = useRef<ActionType>();

  // 回到第一页
  const resetPage = () => {
    ref?.current?.setPageInfo?.({
      current: 1,
    });
  };

  // reset page state
  const resetPageState = useCallback(() => {
    resetPage();
    setQueryTime('');
    setChangeTime([]);
  }, []);

  const getInitData = async () => {
    dsmJobCensusGet().then((res) => {
      if ((res as any).success) {
        setTitleList([
          {
            icon: '',
            title: <FormattedMessage id="monitor.taskList.status.all" defaultMessage="全部" />,
            value: res.data?.total,
            color: '#2A68BF',
            jobStatus: '',
          },
          {
            icon: <IconFont type="icon-chenggong" style={{ fontSize: '1rem' }} />,
            title: <FormattedMessage id="monitor.taskList.status.success" defaultMessage="成功" />,
            value: res.data?.successful,
            color: '#2A68BF',
            jobStatus: 'SUCCESS',
          },
          {
            icon: <IconFont type="icon-shibai" style={{ fontSize: '1rem' }} />,
            title: <FormattedMessage id="monitor.taskList.status.failure" defaultMessage="失败" />,
            value: res.data?.failed,
            color: '#2A68BF',
            jobStatus: 'FAILURE',
          },
          {
            icon: <IconFont type="icon-pending" style={{ fontSize: '1rem' }} />,
            title: <FormattedMessage id="monitor.taskList.status.doing" defaultMessage="进行中" />,
            value: res.data?.doing,
            color: '#2A68BF',
            jobStatus: 'STARTED',
          },
        ]);
      }
    });
  };

  const refreshFun = () => {
    if (ref.current) {
      getInitData();
      ref.current.reload();
    }
  };

  const setJobName = (val: any) => {
    const jobNameList = {};
    if (val?.length > 0) {
      val.forEach((item: any) => {
        jobNameList[item] = {
          text: intl.formatMessage({
            id: `task.${item}`,
          }),
        };
      });
    }
    setJobDataMap(jobNameList);
  };

  // 监听缓存中的异步任务id判断是否需要刷新页面，以保证与全局的异步任务监听同步
  useEffect(() => {
    refreshFun();
  }, [globalJobQueue]);

  const tableData = async (params: any, sort, filters) => {
    let arr = [];
    const preindexNum = (params.current - 1) * params.pageSize + 1;
    const sufindexNum = params.current * params.pageSize;
    const paramData: any = {};
    paramData.cluster_id = clusterId;
    paramData.preindex = preindexNum;
    paramData.sufindex = sufindexNum;
    paramData.filters = {};
    if (Object.keys(sort)?.length > 0) {
      const sortKey = Object.keys(sort)[0];
      paramData.sort_field = sortKey;
      paramData.sort_rule = sort[sortKey] === 'ascend' ? 'asc' : 'desc';
    }
    if (params.queryTime) {
      Object.assign(paramData, params.queryTime);
    }
    if (filters?.job_name) {
      Object.assign(paramData.filters, { job_name: filters.job_name.join(',') });
    }
    if (params?.statusFliter?.jobStatus) {
      Object.assign(paramData.filters, { job_status: params.statusFliter.jobStatus });
    }
    const res: any = await dsmJobGet({ ...paramData }, {});
    if (res?.success && JSON.stringify(res.data) !== '{}') {
      arr = res.data.items;
      setJobName(res.data.name_list);
    } else {
      arr = [];
    }
    return {
      data: arr,
      preindex: res.data.preindex,
      sufindex: res.data.sufindex,
      total: res.data.total,
    };
  };

  const statusMap = {
    STARTED: (
      <>
        <IconFont type="icon-pending" style={{ fontSize: '1rem', marginRight: '8px' }} />
        <FormattedMessage id="monitor.taskList.status.doing" defaultMessage="进行中" />
      </>
    ),
    SUCCESS: (
      <>
        <IconFont type="icon-chenggong" style={{ fontSize: '1rem', marginRight: '8px' }} />
        <FormattedMessage id="monitor.taskList.status.success" defaultMessage="成功" />
      </>
    ),
    FAILURE: (
      <>
        <IconFont type="icon-shibai" style={{ fontSize: '1rem', marginRight: '8px' }} />
        <FormattedMessage id="monitor.taskList.status.failure" defaultMessage="失败" />
      </>
    ),
  };
  const activeColumns: ProColumns<API.queryJob>[] = [
    {
      title: <FormattedMessage id="task.operation.tableHeader.task" defaultMessage="任务" />,
      dataIndex: 'job_name',
      key: 'job_name',
      filters: true,
      onFilter: false,
      valueEnum: jobDataMap,
      fixed: true,
    },
    {
      title: <FormattedMessage id="component.tableTitle.operation" defaultMessage="操作" />,
      key: 'operation',
      width: 150,
      render: (text, record: any) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              e.stopPropagation();
              setIsRightVisible(true);
              setTaskJobId(record.job_id);
            }}
          >
            <FormattedMessage id="component.button.detail" defaultMessage="详情" />
          </a>
        </Space>
      ),
    },
    {
      title: <FormattedMessage id="monitor.operation.tableTile.status" defaultMessage="状态" />,
      dataIndex: 'job_status',
      key: 'job_status',
      render: (_, record: any) => statusMap[record.job_status],
      sorter: true,
      fixed: true,
    },
    {
      title: (
        <FormattedMessage id="monitor.operation.tableTile.startTime" defaultMessage="开始时间" />
      ),
      dataIndex: 'add_time',
      key: 'add_time',
      renderText: (val: string) => `${formatTime(val)}`,
      sorter: true,
      fixed: true,
    },
    {
      title: <FormattedMessage id="monitor.taskList.progress" defaultMessage="进度" />,
      dataIndex: 'progress',
      key: 'progress',
      fixed: true,
      render: (_, row) => (
        <>
          <Progress
            percent={parseInt(row.progress.substring(0, row.progress?.length - 1))}
            strokeWidth={10}
            strokeLinecap="square"
          />
        </>
      ),
      sorter: true,
    },
  ];

  const changeFun = (val: any) => {
    if (!isEmpty(val)) {
      setChangeTime(val);
    } else {
      setChangeTime([]);
      // Business Requirement: request data after clearing date picker to improve UX
      setQueryTime('');
      refreshFun();
    }
  };

  const queryFun = useCallback(() => {
    resetPage();
    const timeRange = moment2timeStamp(changeTime);
    if (!isEmpty(timeRange)) {
      setQueryTime({ ...timeRange });
    } else {
      setQueryTime('');
    }
  }, [changeTime]);

  const statusTitleChange = useCallback((val?) => {
    if (!isEmpty(val)) {
      resetPageState();
      setStatusFliter({
        title: val.title,
        jobStatus: val.jobStatus,
      });
    } else {
      setStatusFliter({});
    }
  }, []);

  const overview = (
    <ProCard.Group title={null} direction="row" className="common-page-header-statistic">
      {titleList.map((item) => {
        return (
          <Fragment key={item.jobStatus}>
            <Divider type="vertical" />
            <ProCard size="small" onClick={() => statusTitleChange(item)}>
              <Statistic
                title={
                  <Space align="center">
                    {item.icon}
                    {item.title}
                  </Space>
                }
                value={item.value}
                valueStyle={{ color: item.color }}
              />
            </ProCard>
          </Fragment>
        );
      })}
      <ProCard size="small" />
    </ProCard.Group>
  );

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard
        className={`${styles.container} common-page`}
        onClick={() => setIsRightVisible(false)}
        title={
          <Row className="common-page-title">
            <FormattedMessage id="menu.alarm.tasks" defaultMessage="任务列表" />
          </Row>
        }
      >
        {overview}
        <ProTable<API.queryJob>
          actionRef={ref}
          columns={activeColumns}
          request={tableData}
          params={{ queryTime, statusFliter }}
          options={false}
          search={false}
          rowKey="job_id"
          pagination={{
            pageSize: 10,
          }}
          headerTitle={
            <Space>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                value={changeTime}
                onChange={changeFun}
              />
              <Button type="primary" onClick={queryFun}>
                <FormattedMessage id="component.button.query" defaultMessage="查询" />
              </Button>
            </Space>
          }
          toolBarRender={() => [
            statusFliter?.title ? (
              <StatisticTag title={statusFliter?.title} closeEvent={() => statusTitleChange()} />
            ) : null,
            <Button type="default" icon={<RedoOutlined />} onClick={refreshFun} />,
          ]}
        />
      </ProCard>

      <TaskInfoDrawer
        handleCancel={() => setIsRightVisible(false)}
        drawerVisible={isRightVisible}
        taskJobId={taskJobId}
      />
    </PageContainer>
  );
};

export default AlarmTasks;
