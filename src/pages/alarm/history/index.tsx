import { useIntl, FormattedMessage, useModel, Access, useAccess } from 'umi';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Space, Input, DatePicker, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { RedoOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { saveAs } from 'file-saver';
import { isArray, isEmpty } from 'lodash';
import { formatTime } from '@/utils';
import { alertConfigs, formatEntityName } from '../helper';
import IconFont from '@/components/IconFont';
import ContentHeaderStatistic from '@/components/Statistic';
import StatisticTag from '@/components/StatisticTag';
import {
  dsmAlertHistoryGet,
  dsmAlertExport,
  uiSummaryHistoryAlertSummaryGet,
} from '@/services/dsm/alert';
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

const HistoryAlarm: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const access = useAccess();

  // 页面顶部状态栏
  const [configValues, setConfigValues] = useState<any>(undefined);

  // 搜索
  const [searchData, setSearchData] = useState<string>('');

  // Don't remove. this is for hold Input.Search render value when re-render componnet
  const [searchDataRenderValue, setSearchDataRenderValue] = useState<string>('');

  const [changeTime, setChangeTime] = useState<any>([]); // 时间容器变化值

  // 查询
  const [queryTime, setQueryTime] = useState<any>(''); // 查询时间

  const [titleDataMap, seTitleDataMap] = useState<any>({});

  const getInitData = useCallback(async () => {
    uiSummaryHistoryAlertSummaryGet({ cluster_id: clusterId }).then((res) => {
      if ((res as any).success) {
        setConfigValues(res?.data);
      }
    });
  }, [clusterId]);

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

  const searchFun = useCallback((val: any) => {
    resetPage();
    setSearchData(val.replace(/^\s+|\s+$/g, ''));
  }, []);

  const changeFun = useCallback((val: any) => {
    if (!isEmpty(val)) {
      setChangeTime(val);
    } else {
      setChangeTime([]);
      // Business Requirement: request data after clearing date picker to improve UX
      setQueryTime('');
      refreshFun();
    }
  }, []);

  const queryFun = useCallback(() => {
    resetPage();
    const timeRange = moment2timeStamp(changeTime);
    if (!isEmpty(timeRange)) {
      setQueryTime({ ...timeRange });
    } else {
      setQueryTime('');
    }
  }, [changeTime]);

  const resetPageState = useCallback(() => {
    resetPage();
    setSearchData('');

    // clear Input.Search render value
    setSearchDataRenderValue('');
    setChangeTime([]);
    setQueryTime('');
  }, []);

  useEffect(() => {
    getInitData();
  }, [clusterId, getInitData]);

  // 状态栏筛选
  const [severityFliter, setSeverityFliter] = useState<any>();
  const statusTitleChange = useCallback(
    (val?) => {
      if (!isEmpty(val)) {
        resetPageState();
        setSeverityFliter({
          title: val.title,
          num: val.severity,
        });
      } else {
        setSeverityFliter({});
      }
    },
    [resetPageState],
  );

  const setTitleData = (val: any) => {
    const titleData = {};
    if (val?.length > 0) {
      val.forEach((item: any) => {
        titleData[item.alerttype_id] = item.alert_title;
      });
    }

    seTitleDataMap(titleData);
  };

  // 查询列表数据
  const tableData = async (params: any, sort, filters) => {
    let arr = [];
    const preindexNum = (params.current - 1) * params.pageSize + 1;
    const sufindexNum = params.current * params.pageSize;
    const paramData: any = {};
    paramData.cluster_id = clusterId;
    paramData.preindex = preindexNum;
    paramData.sufindex = sufindexNum;
    paramData.filters = {};
    if (params.searchData) {
      paramData.keyword = params.searchData;
    }
    if (params.queryTime) {
      Object.assign(paramData, params.queryTime);
    }
    if (Object.keys(sort)?.length > 0) {
      const sortKey = Object.keys(sort)[0];
      paramData.sort_field = sortKey;
      paramData.sort_rule = sort[sortKey] === 'ascend' ? 'asc' : 'desc';
    }
    if (params?.severityFliter?.num) {
      Object.assign(paramData.filters, { severity: params.severityFliter.num });
    }
    if (filters?.alert_title) {
      Object.assign(paramData.filters, { alerttype_id: filters.alert_title.join(',') });
    }
    const res: any = await dsmAlertHistoryGet({ ...paramData }, {});
    if (res?.success && JSON.stringify(res.data) !== '{}') {
      arr = res.data.items;
      setTitleData(res.data.conditions);
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

  const severityMap = {
    1: {
      text: (
        <span>
          <IconFont type="icon-tishi" />
          {intl.formatMessage({
            id: 'monitor.historyAlarm.severity.information',
            defaultMessage: ' 信息 ',
          })}
        </span>
      ),
      status: '',
    },
    2: {
      text: (
        <span>
          <IconFont type="icon-jinggao" />
          {intl.formatMessage({
            id: 'monitor.historyAlarm.severity.warning',
            defaultMessage: ' 提示 ',
          })}
        </span>
      ),
      status: '',
    },
    3: {
      text: (
        <span>
          <IconFont type="icon-putonggaojing" />
          {intl.formatMessage({
            id: 'monitor.historyAlarm.severity.minor',
            defaultMessage: ' 普通 ',
          })}
        </span>
      ),
      status: '',
    },
    4: {
      text: (
        <span>
          <IconFont type="icon-zhongyao" />
          {intl.formatMessage({
            id: 'monitor.historyAlarm.severity.major',
            defaultMessage: ' 重要 ',
          })}
        </span>
      ),
      status: '',
    },
    5: {
      text: (
        <span>
          <IconFont type="icon-jinji" />
          {intl.formatMessage({
            id: 'monitor.historyAlarm.severity.critical',
            defaultMessage: ' 紧急 ',
          })}
        </span>
      ),
      status: '',
    },
  };

  const activeColumns: ProColumns<API.queryAlertEvents>[] = [
    {
      title: <FormattedMessage id="monitor.historyAlarm.severity" defaultMessage="级别" />,
      dataIndex: 'severity',
      key: 'severity',
      initialValue: 'all',
      valueEnum: severityMap,
      sorter: true,
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.clearTime" defaultMessage="清除时间" />,
      dataIndex: 'clear_time',
      key: 'clear_time',
      renderText: (val: string) => `${formatTime(val)}`,
      sorter: true,
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.triggerTime" defaultMessage="触发时间" />,
      dataIndex: 'occur_time',
      key: 'occur_time',
      sorter: true,
      renderText: (val: string) => `${formatTime(val)}`,
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.type" defaultMessage="类型" />,
      dataIndex: 'alert_title',
      key: 'alert_title',
      filters: true,
      onFilter: false,
      valueEnum: titleDataMap,
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.description" defaultMessage="描述" />,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.entityType" defaultMessage="对象类型" />,
      dataIndex: 'entity_type',
      key: 'entity_type',
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.entityName" defaultMessage="对象名称" />,
      dataIndex: 'entity_name',
      key: 'entity_name',
      render: (text, record: any) => formatEntityName(record, intl),
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.cleaner" defaultMessage="清除者" />,
      dataIndex: 'clear_executor',
      key: 'clear_executor',
    },
  ];

  // 导出
  const exportData = async () => {
    const paramData: any = {};
    paramData.cluster_id = clusterId;
    if (!isEmpty(changeTime)) {
      Object.assign(paramData, moment2timeStamp(changeTime));
    }
    const result: any = await dsmAlertExport(
      { ...paramData },
      { parseResponse: false, getResponse: false },
    );
    if (result.headers.get('Content-type') === 'application/csv') {
      const blob = await result.blob();
      const fileName = `historical_alarm_${new Date().toLocaleDateString()}.csv`;
      saveAs(blob, fileName);
    } else {
      const data = await result.json();
    }
  };

  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard
        className={`${styles.container} common-page`}
        title={
          <Row className="common-page-title">
            <FormattedMessage id="menu.alarm.history" defaultMessage="历史告警" />
          </Row>
        }
      >
        <ContentHeaderStatistic
          configs={alertConfigs}
          values={configValues}
          clickEvent={statusTitleChange}
        />

        <ProTable<API.queryAlertEvents>
          actionRef={ref}
          columns={activeColumns}
          request={tableData}
          params={{ searchData, queryTime, severityFliter }}
          pagination={{
            pageSize: 10,
          }}
          scroll={{ x: 1500 }}
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
              <Access accessible={access.admin}>
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
                defaultMessage: '请输入',
              })}
            />,
            <Button type="default" icon={<RedoOutlined />} onClick={refreshFun} />,
          ]}
        />
      </ProCard>
    </PageContainer>
  );
};

export default HistoryAlarm;
