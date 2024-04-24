import { useIntl, FormattedMessage, useModel, Access, useAccess } from 'umi';
import React, { useRef, useEffect, useCallback } from 'react';
import { Button, DatePicker, Input, message, Row, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { RedoOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import { useSafeState } from 'ahooks';
import { isArray, isEmpty } from 'lodash';
import { formatTime } from '@/utils';
import { operationConfigs } from '../helper';
import IconFont from '@/components/IconFont';
import ContentHeaderStatistic from '@/components/Statistic';
import StatisticTag from '@/components/StatisticTag';
import {
  dsmOperationrecordGet,
  dsmOperationrecordExport,
  uiSummaryOperationrecordsummaryGet,
} from '@/services/dsm/operationRecord';
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

const OperationRecord: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const [exportParam, setExportParam] = useSafeState<any>([]);
  const access = useAccess();

  const [configValues, setConfigValues] = useSafeState<any>([]);

  // 查询
  const [changeTime, setChangeTime] = useSafeState<any>(''); // 时间容器变化值

  const [queryTime, setQueryTime] = useSafeState<any>(''); // 查询时间

  // 搜索
  const [searchData, setSearchData] = useSafeState<string>('');

  // Don't remove. this is for hold Input.Search render value when re-render componnet
  const [searchDataRenderValue, setSearchDataRenderValue] = useSafeState<string>('');

  // 状态栏筛选
  const [severityFliter, setSeverityFliter] = useSafeState<any>();

  const [jobDataMap, setJobDataMap] = useSafeState<any>({});

  const getInitData = async () => {
    uiSummaryOperationrecordsummaryGet({ cluster_id: clusterId }).then((res) => {
      if ((res as any).success) {
        setConfigValues(res?.data);
      }
    });
  };

  useEffect(() => {
    getInitData();
  }, []);

  // 刷新
  const ref = useRef<ActionType>();
  const refreshFun = () => {
    if (ref.current) {
      ref.current.reload();
      getInitData();
    }
  };

  // 回到第一页
  const resetPage = () => {
    ref?.current?.setPageInfo?.({
      current: 1,
    });
  };

  // reset page state
  const resetPageState = useCallback(() => {
    resetPage();
    setSearchData('');
    setSearchDataRenderValue('');
    setQueryTime('');
    setChangeTime([]);
  }, [setChangeTime, setQueryTime, setSearchData, setSearchDataRenderValue]);

  const changeFun = useCallback(
    (val: any) => {
      if (!isEmpty(val)) {
        setChangeTime(val);
      } else {
        setChangeTime([]);
        // Business Requirement: request data after clearing date picker to improve UX
        setQueryTime('');
        refreshFun();
      }
    },
    [setChangeTime],
  );

  const queryFun = useCallback(() => {
    resetPage();
    const timeRange = moment2timeStamp(changeTime);
    if (!isEmpty(timeRange)) {
      setQueryTime({ ...timeRange });
    } else {
      setQueryTime('');
    }
  }, [changeTime, setQueryTime]);

  const searchFun = useCallback(
    (val: any) => {
      resetPage();
      setSearchData(val.replace(/^\s+|\s+$/g, ''));
    },
    [setSearchData],
  );

  const statusTitleChange = useCallback((val?) => {
    if (!isEmpty(val)) {
      resetPageState();
      setSeverityFliter({
        title: val.title,
        num: val.severityNum,
      });
    } else {
      setSeverityFliter({});
    }
  }, []);

  const tableData = async (params: any, sort, filter) => {
    let arr = [];
    const preindexNum = (params.current - 1) * params.pageSize + 1;
    const sufindexNum = params.current * params.pageSize;
    const paramData: any = {};
    paramData.cluster_id = clusterId;
    paramData.preindex = preindexNum;
    paramData.sufindex = sufindexNum;
    if (params.searchData) {
      paramData.keyword = params.searchData;
      paramData.fuzzy = 'target_names';
    }
    if (params.severityFliter?.num) {
      paramData.filters = { status: params.severityFliter.num };
    }
    if (filter?.operation) {
      paramData.operation_list = filter.operation.join(',');
    }
    if (params.queryTime) {
      Object.assign(paramData, params.queryTime);
    }
    const { operation_list, filters, keyword, fuzzy } = paramData || {};
    setExportParam({ operation_list, filters, keyword, fuzzy });
    if (Object.keys(sort)?.length > 0) {
      const sortKey = Object.keys(sort)[0];
      paramData.sort_field = sortKey;
      paramData.sort_rule = sort[sortKey] === 'ascend' ? 'asc' : 'desc';
    }
    const res: any = await dsmOperationrecordGet({ ...paramData }, {});
    if (res?.success && JSON.stringify(res.data) !== '{}') {
      arr = res.data.items;
      setJobDataMap(res.data.operations);
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
    '3': (
      <>
        <IconFont type="icon-chenggong" style={{ fontSize: '1rem', marginRight: '8px' }} />
        <FormattedMessage id="monitor.taskList.status.success" defaultMessage="成功" />
      </>
    ),
    '2': (
      <>
        <IconFont type="icon-shibai" style={{ fontSize: '1rem', marginRight: '8px' }} />
        <FormattedMessage id="monitor.taskList.status.failure" defaultMessage="失败" />
      </>
    ),
    '1': (
      <>
        <IconFont type="icon-pending" style={{ fontSize: '1rem', marginRight: '8px' }} />
        <FormattedMessage id="monitor.taskList.status.doing" defaultMessage="进行中" />
      </>
    ),
  };
  const activeColumns: ProColumns<API.queryOperationRecord>[] = [
    {
      title: <FormattedMessage id="monitor.taskList.operator" defaultMessage="操作者" />,
      dataIndex: 'u_name',
      key: 'u_name',
      fixed: true,
    },
    {
      title: <FormattedMessage id="monitor.operation.tableTile.operation" defaultMessage="操作" />,
      dataIndex: 'operation',
      key: 'operation',
      filters: true,
      onFilter: false,
      renderText: (_, row: any) =>
        intl.formatMessage(
          { id: `monitor.operation.tableText`, defaultMessage: '操作' },
          { operation: row.operation, target_type: row.target_type },
        ),
      valueEnum: jobDataMap,
      fixed: true,
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.entityName" defaultMessage="对象名称" />,
      dataIndex: 'target_names',
      key: 'target_names',
    },
    {
      title: <FormattedMessage id="monitor.operation.tableTile.status" defaultMessage="状态" />,
      dataIndex: 'status',
      key: 'status',
      render: (_, record: any) => statusMap[record.status],
      sorter: true,
    },
    {
      title: (
        <FormattedMessage
          id="monitor.operation.tableTile.operationTime"
          defaultMessage="操作时间"
        />
      ),
      dataIndex: 'start_time',
      key: 'start_time',
      renderText: (val: string) => `${formatTime(val)}`,
      sorter: true,
    },
  ];

  // 导出操作记录
  const exportData = async () => {
    const paramData: any = {};
    paramData.cluster_id = clusterId;
    if (!isEmpty(changeTime)) {
      Object.assign(paramData, moment2timeStamp(changeTime));
    }
    Object.assign(paramData, exportParam);
    const result: any = await dsmOperationrecordExport(
      { ...paramData },
      { parseResponse: false, getResponse: false },
    );
    if (result.headers.get('Content-type') === 'application/csv') {
      const blob = await result.blob();
      const fileName = `operating_record_${new Date().toLocaleDateString()}.csv`;
      saveAs(blob, fileName);
    } else {
      const data = await result.json();
      message.error(data.msg);
    }
  };
  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard
        split="horizontal"
        className={`${styles.container} common-page`}
        title={
          <Row className="common-page-title">
            <FormattedMessage id="menu.alarm.operate" defaultMessage="操作记录" />
          </Row>
        }
      >
        <ContentHeaderStatistic
          configs={operationConfigs}
          values={configValues}
          clickEvent={statusTitleChange}
        />

        <ProTable<API.queryOperationRecord>
          actionRef={ref}
          columns={activeColumns}
          request={tableData}
          pagination={{
            pageSize: 10,
          }}
          params={{ searchData, queryTime, severityFliter }}
          options={false}
          search={false}
          rowKey="id"
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
              <Access accessible={access.super}>
                <Button type="primary" onClick={exportData}>
                  <FormattedMessage id="monitor.historyAlarm.export" defaultMessage="导出" />
                </Button>
              </Access>
            </Space>
          }
          toolBarRender={() => [
            severityFliter?.title ? (
              <StatisticTag title={severityFliter?.title} closeEvent={() => statusTitleChange()} />
            ) : null,
            <Input.Search
              allowClear
              value={searchDataRenderValue}
              onChange={(e) => setSearchDataRenderValue(e?.target?.value)}
              onSearch={searchFun}
              placeholder={intl.formatMessage({
                id: 'monitor.searchInput.tip',
                defaultMessage: '请输入对象名称...',
              })}
            />,
            <Button type="default" icon={<RedoOutlined />} onClick={refreshFun} />,
          ]}
        />
      </ProCard>
    </PageContainer>
  );
};

export default OperationRecord;
