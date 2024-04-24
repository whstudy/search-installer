import { useIntl, FormattedMessage, useModel, useLocation } from 'umi';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSafeState } from 'ahooks';
import { isEmpty } from 'lodash';
import { Button, Modal, Input, Space, message, Row, Select } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import IconFont from '@/components/IconFont';
import ContentHeaderStatistic from '@/components/Statistic';
import StatisticTag from '@/components/StatisticTag';
import { formatTime } from '@/utils';
import { alertConfigs, formatEntityName } from '../helper';
import {
  dsmAlertCurrentGet,
  dsmAlertClear,
  uiSummaryCurrentAlertSummaryGet,
} from '@/services/dsm/alert';
import styles from './index.less';

const { Option } = Select;

const CurrentAlarm: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster, currentUser } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const location = useLocation();
  const [isUser] = useSafeState(currentUser?.role === 'user');
  const {
    query: { servityNum },
  } = location as any;

  // route state
  const [routeState, setRouteState] = useSafeState<any>(undefined);

  // 状态栏筛选
  const [currentStatisticKey, setCurrentStatisticKey] = useSafeState<string | undefined>(undefined);
  const [titleDataMap, seTitleDataMap] = useSafeState<any>({});

  // 顶部状态栏
  const [configValues, setConfigValue] = useSafeState<API.currentAlertSummary['data']>(undefined);

  const [removeVisible, setRemoveVisible] = useState(false);
  const [alarm, setAlarm] = useState();

  // 定时查询当前告警
  const ref = useRef<ActionType>();

  // 回到第一页
  const resetPage = () => {
    ref?.current?.setPageInfo?.({
      current: 1,
    });
  };

  // 搜索
  const [searchData, setSearchData] = useSafeState<string>('');
  // Don't remove. this is for hold Input.Search render value when re-render componnet
  const [searchDataRenderValue, setSearchDataRenderValue] = useSafeState<string>('');

  const searchFun = useCallback(
    (val: any) => {
      resetPage();
      setSearchData(val.replace(/^\s+|\s+$/g, ''));
    },
    [setSearchData],
  );

  const resetPageState = useCallback(() => {
    resetPage();
    setSearchData('');
    setSearchDataRenderValue('');
  }, [setSearchData, setSearchDataRenderValue]);

  const healthStatusChange = useCallback(
    (item) => {
      if (!isEmpty(item)) {
        resetPageState();
      }
      setCurrentStatisticKey(!item?.key || item?.key === 'all' ? undefined : item?.key);
    },
    [resetPageState, setCurrentStatisticKey],
  );

  const getInitData = useCallback(async () => {
    uiSummaryCurrentAlertSummaryGet({ cluster_id: clusterId }).then((res) => {
      if ((res as any).success) {
        setConfigValue(res?.data);
      }
    });
  }, [clusterId, setConfigValue]);

  const findCurrentStatistic = useCallback(
    (key) => alertConfigs?.filter((v) => v?.key === key)?.[0],
    [],
  );

  useEffect(() => {
    getInitData();
  }, [clusterId, getInitData]);

  useEffect(() => {
    if (servityNum) {
      healthStatusChange(alertConfigs?.filter((v) => v?.severity === servityNum)?.[0]);
    }
  }, [servityNum, healthStatusChange]);

  const setTitleData = (val: any) => {
    const titleData = {};
    if (val?.length > 0) {
      val.forEach((item: any) => {
        titleData[item.alerttype_id] = item.alert_title;
      });
    }
    seTitleDataMap(titleData);
  };

  const tableData = async (params: any, sort, filters) => {
    let arr = [];
    const { statisMode } = params || {};
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
    if (statisMode?.severity) {
      Object.assign(paramData.filters, { severity: statisMode?.severity });
    }
    if (Object.keys(sort)?.length > 0) {
      const sortKey = Object.keys(sort)[0];
      paramData.sort_field = sortKey;
      paramData.sort_rule = sort[sortKey] === 'ascend' ? 'asc' : 'desc';
    }
    if (filters?.alert_title) {
      Object.assign(paramData.filters, { alerttype_id: filters.alert_title.join(',') });
    }
    const res: any = await dsmAlertCurrentGet({ ...paramData }, {});
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

  // 刷新
  const refreshFun = useCallback(() => {
    if (ref.current) {
      ref.current.reload();
      getInitData();
    }
  }, [getInitData]);

  // 手动清除告警
  const handleRemove = async (val) => {
    setRemoveVisible(false);
    const res = await dsmAlertClear({
      cluster_id: clusterId,
      alert_id: val.id,
      name: val.alert_title,
    });
    if ((res as any).success) {
      message.success(res.msg);
      if (ref.current) {
        ref.current.reload();
        getInitData();
      }
    } else {
      message.error(res.msg);
    }
  };

  useEffect(() => {
    const entity = location?.state?.entity;
    if (!isEmpty(entity)) {
      searchFun(entity?.name || '');
      setRouteState({ ...entity });
    }
  }, [location?.state, searchFun, setRouteState]);

  const confirmRemove = (record) => {
    setRemoveVisible(true);
    setAlarm(record);
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
  let modal: any;
  const activeColumns: ProColumns<API.queryAlert>[] = [
    {
      title: <FormattedMessage id="monitor.historyAlarm.severity" defaultMessage="级别" />,
      dataIndex: 'severity',
      key: 'severity',
      initialValue: 'all',
      valueEnum: severityMap,
      sorter: true,
    },
    !isUser
      ? {
          title: <FormattedMessage id="component.tableTitle.operation" defaultMessage="操作" />,
          key: 'operation',
          width: 120,
          render: (text, record: any) => (
            <Button type="link" onClick={() => confirmRemove(record)}>
              {intl.formatMessage({
                id: 'monitor.historyAlarm.severity.clear',
                defaultMessage: '清除',
              })}
            </Button>
          ),
        }
      : {},
    {
      title: <FormattedMessage id="monitor.historyAlarm.triggerTime" defaultMessage="触发时间" />,
      dataIndex: 'last_change',
      key: 'last_change',
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
  ];

  const renderToolBar = useCallback(() => {
    const entityName = routeState?.name;
    const locale = routeState?.locale;
    const currentStatistic = findCurrentStatistic(currentStatisticKey);

    return [
      currentStatistic ? (
        <StatisticTag
          title={currentStatistic?.title}
          closeEvent={() => healthStatusChange(undefined)}
        />
      ) : null,

      !routeState ? (
        <Input.Search
          allowClear
          value={searchDataRenderValue}
          onChange={(e) => setSearchDataRenderValue(e?.target?.value)}
          onSearch={searchFun}
          placeholder={intl.formatMessage({
            id: 'monitor.searchInput.tip',
            defaultMessage: '请输入',
          })}
        />
      ) : null,

      entityName ? (
        <Space>
          <FormattedMessage id="filter.current" defaultMessage="当前筛选" />
          <Select
            value={entityName}
            allowClear
            onChange={(v) => {
              searchFun(v || '');
              setRouteState(v);
            }}
          >
            <Option value={entityName}>
              <FormattedMessage id={locale} defaultMessage="资源名称" />：{entityName}
            </Option>
          </Select>
        </Space>
      ) : null,

      <Button type="default" icon={<RedoOutlined />} onClick={refreshFun} />,
    ].filter((v) => v);
  }, [
    routeState,
    findCurrentStatistic,
    currentStatisticKey,
    searchDataRenderValue,
    searchFun,
    intl,
    refreshFun,
    healthStatusChange,
    setSearchDataRenderValue,
    setRouteState,
  ]);

  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard
        className={`${styles.container} common-page`}
        title={
          <Row className="common-page-title">
            <FormattedMessage id="menu.alarm.current" defaultMessage="当前告警" />
          </Row>
        }
      >
        <ContentHeaderStatistic
          configs={alertConfigs}
          values={configValues}
          clickEvent={healthStatusChange}
        />

        <ProTable<API.queryAlert>
          actionRef={ref}
          columns={activeColumns}
          request={tableData}
          params={{ searchData, statisMode: findCurrentStatistic(currentStatisticKey) }}
          pagination={{
            pageSize: 10,
          }}
          scroll={{ x: 1500 }}
          options={false}
          search={false}
          rowKey="id"
          toolBarRender={renderToolBar}
        />
      </ProCard>

      <Modal
        centered
        title={intl.formatMessage({
          id: 'monitor.historyAlarm.severity.clearTittle',
          defaultMessage: ' 清除当前告警 ',
        })}
        visible={removeVisible}
        onOk={() => handleRemove(alarm)}
        onCancel={() => setRemoveVisible(false)}
      >
        {intl.formatMessage({
          id: 'monitor.historyAlarm.severity.clearTip',
          defaultMessage: ' 您确定清除这条告警吗？清除后，该告警被移至到历史告警列表! ',
        })}
      </Modal>
    </PageContainer>
  );
};

export default CurrentAlarm;
