import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, useModel, Access, useAccess } from 'umi';
import React, { useState, useRef } from 'react';
import { dsmAlertConfigGet } from '@/services/dsm/alert';
import { Space, Button, Row } from 'antd';
import { PoweroffOutlined, StopOutlined, RedoOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import AlarmEditDrawer from './components/edit';
import styles from './index.less';
import IconFont from '@/components/IconFont';

const CurrentAlarm: React.FC = () => {
  const intl = useIntl();
  const access = useAccess();
  const { initialState } = useModel('@@initialState');
  const { currentCluster, currentUser } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const [isAdmin] = useState(currentUser?.role === 'superadmin');

  // 编辑弹框
  const defaultInfo: API.queryalertconf = {
    id: 1,
    severity: '', // 告警级别
    entity_type: 0, // 告警对象
    description: '', // 告警描述
    threshold: '', // 阈值
    unit: '', // 单位
    alert_enabled: 0, // 是否告警
    threshold_switch: 0, // 是否允许修改阈值
  };
  const [isRightVisible, setIsRightVisible] = useState<boolean>(false); // 显示右侧抽屉
  const [infoData, setIndexData] = useState<API.queryalertconf>(defaultInfo); // 告警信息

  const [titleDataMap, seTitleDataMap] = useState<any>({});
  const entity_typeMap = (val: any) => {
    const titleData = {};
    if (val?.length > 0) {
      val.forEach((item: any) => {
        titleData[item.entity_id] = item.entity_name;
      });
    }
    seTitleDataMap(titleData);
  };

  // table
  const ref = useRef<ActionType>();
  const tableData = async (params: any, sort, filter) => {
    let arr = [];
    const preindexNum = (params.current - 1) * params.pageSize + 1;
    const sufindexNum = params.current * params.pageSize;
    const paramData: any = {};
    paramData.cluster_id = clusterId;
    paramData.preindex = preindexNum;
    paramData.sufindex = sufindexNum;
    if (params.severityFliter?.num) {
      paramData.filters = { severity: params.severityFliter.num };
    }
    if (Object.keys(sort).length > 0) {
      const sortKey = Object.keys(sort)[0];
      paramData.sort_field = sortKey;
      paramData.sort_rule = sort[sortKey] === 'ascend' ? 'asc' : 'desc';
    }
    if (filter?.entity_type) {
      paramData.filters = { entity_type: filter.entity_type[0] };
    }

    // ref.current.reloadAndRest() // 刷新并清空,可以重置页码
    const res: any = await dsmAlertConfigGet({ ...paramData }, {});
    if (res?.success && JSON.stringify(res.data) !== '{}') {
      arr = res.data.items;
      entity_typeMap(res?.data?.entities);
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

  // 修改后刷新
  const ChildrenChange = (val: any) => {
    if (ref.current && val) {
      ref.current.reload();
    }
  };

  // 刷新
  const refreshFun = () => {
    if (ref.current) {
      ref.current.reload();
    }
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

  const statusMap = {
    0: {
      text: (
        <span>
          <StopOutlined />
          {intl.formatMessage({
            id: 'monitor.config.tableList.off',
            defaultMessage: ' 关闭 ',
          })}
        </span>
      ),
      status: '',
    },
    1: {
      text: (
        <span>
          <PoweroffOutlined />
          {intl.formatMessage({
            id: 'monitor.config.tableList.on',
            defaultMessage: ' 开启 ',
          })}
        </span>
      ),
      status: '',
    },
  };

  const activeColumns: ProColumns<API.queryalertconf>[] = [
    {
      title: <FormattedMessage id="monitor.historyAlarm.severity" defaultMessage="级别" />,
      dataIndex: 'severity',
      key: 'severity',
      initialValue: 'all',
      sorter: true,
      valueEnum: severityMap,
    },
    isAdmin
      ? {
          title: <FormattedMessage id="component.tableTitle.operation" defaultMessage="操作" />,
          key: 'operation',
          width: 120,
          render: (text, record: any) => (
            <Space size="middle">
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRightVisible(true);
                  setIndexData(record);
                }}
              >
                <FormattedMessage id="monitor.config.tableList.edit" defaultMessage="编辑" />
              </a>
            </Space>
          ),
        }
      : {},
    {
      title: <FormattedMessage id="monitor.historyAlarm.entityType" defaultMessage="对象类型" />,
      dataIndex: 'entity_type',
      key: 'entity_type',
      initialValue: 'all',
      filters: true,
      onFilter: false,
      filterMultiple: false,
      valueEnum: titleDataMap,
    },
    {
      title: <FormattedMessage id="monitor.historyAlarm.type" defaultMessage="类型" />,
      dataIndex: 'alert_title',
      key: 'alert_title',
    },
    {
      title: <FormattedMessage id="monitor.config.tableList.threshold" defaultMessage="阈值" />,
      dataIndex: 'threshold',
      key: 'threshold',
      renderText: (_, row: any) => (
        <span>
          {row.threshold}
          {row.unit}
        </span>
      ),
    },
    {
      title: <FormattedMessage id="monitor.operation.tableTile.status" defaultMessage="状态" />,
      dataIndex: 'alert_enabled',
      key: 'alert_enabled',
      valueEnum: statusMap,
    },
  ];

  return (
    <PageContainer pageHeaderRender={false}>
      <ProCard
        split="horizontal"
        className={`${styles.container} common-page`}
        title={
          <Row className="common-page-title">
            <FormattedMessage id="menu.alarm.config" defaultMessage="告警配置" />
          </Row>
        }
      >
        <ProTable<API.queryalertconf>
          actionRef={ref}
          columns={activeColumns}
          request={tableData}
          pagination={{
            pageSize: 10,
          }}
          scroll={{ x: 1500 }}
          options={false}
          search={false}
          rowKey="id"
          toolBarRender={() => [
            <Button type="default" icon={<RedoOutlined />} onClick={refreshFun} />,
          ]}
        />
      </ProCard>
      <AlarmEditDrawer
        handleCancel={(val) => setIsRightVisible(val)}
        changeData={ChildrenChange}
        drawerVisible={isRightVisible}
        currentData={infoData}
      />
    </PageContainer>
  );
};

export default CurrentAlarm;
