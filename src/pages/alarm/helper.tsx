import IconFont from '@/components/IconFont';
import { FormattedMessage } from 'umi';

export const alertConfigs = [
  {
    key: 'total',
    title: <FormattedMessage id="monitor.current.status.allAlarms" defaultMessage="所有告警" />,
    status: 'healthy',
  },
  {
    key: 'urgent',
    title: <FormattedMessage id="monitor.historyAlarm.severity.critical" defaultMessage="紧急" />,
    icon: <IconFont type="icon-jinji" />,
    status: 'error',
    severity: '5',
  },
  {
    key: 'important',
    icon: <IconFont type="icon-zhongyao" />,
    title: <FormattedMessage id="monitor.historyAlarm.severity.major" defaultMessage="重要" />,
    status: 'important',
    severity: '4',
  },
  {
    key: 'normal',
    icon: <IconFont type="icon-putonggaojing" />,
    title: <FormattedMessage id="monitor.historyAlarm.severity.minor" defaultMessage="普通" />,
    status: 'normal',
    severity: '3',
  },
  {
    key: 'warning',
    icon: <IconFont type="icon-jinggao" />,
    title: <FormattedMessage id="monitor.historyAlarm.severity.warning" defaultMessage="警告" />,
    status: 'warning',
    severity: '2',
  },
  {
    key: 'info',
    icon: <IconFont type="icon-tishi" />,
    title: (
      <FormattedMessage id="monitor.historyAlarm.severity.information" defaultMessage="信息" />
    ),
    status: 'healthy',
    severity: '1',
  },
];

export const operationConfigs = [
  {
    key: 'count',
    title: <FormattedMessage id="monitor.taskList.status.all" defaultMessage="全部" />,
    // title: 'monitor.taskList.status.all',
    // defaul: ' 全部 ',
    // color: '#2A68BF',
    severityNum: '',
  },
  {
    key: 'successful',
    icon: <IconFont type="icon-chenggong" style={{ fontSize: '1rem' }} />,
    title: <FormattedMessage id="monitor.taskList.status.success" defaultMessage="成功" />,
    // title: 'monitor.taskList.status.success',
    // defaul: ' 成功 ',
    // color: '#2A68BF',
    severityNum: '3',
  },
  {
    key: 'failed',
    icon: <IconFont type="icon-shibai" style={{ fontSize: '1rem' }} />,
    title: <FormattedMessage id="monitor.taskList.status.failure" defaultMessage="失败" />,
    status: 'error',
    // title: 'monitor.taskList.status.failure',
    // defaul: ' 失败 ',
    // color: '#2A68BF',
    severityNum: '2',
  },
  {
    key: 'doing',
    icon: <IconFont type="icon-pending" style={{ fontSize: '1rem' }} />,
    title: <FormattedMessage id="monitor.taskList.status.doing" defaultMessage="进行中" />,

    // title: 'monitor.taskList.status.doing',
    // defaul: ' 进行中 ',
    // color: '#2A68BF',
    severityNum: '1',
  },
];

/**
 * 处理‘对象名称’显示
 * 当告警类型属于‘桶’或‘用户’，需要将对象名称为:桶名或用户名/租户名
 * 需展示为：桶或用户（租户：XXXX）
 * objectIds 是告警类型为桶和用户的id集
 * @param val table的行数据
 * @returns
 */
export const formatEntityName = (val, intl) => {
  let entityName;
  const objectIds = [102, 103, 104, 105, 106, 107, 108, 109, 110, 111];
  if (objectIds.includes(val?.alerttype_id)) {
    const nameSplit = val?.entity_name.split('/');
    entityName = nameSplit[1]
      ? `${nameSplit[0]}（${intl.formatMessage({ id: 'bucket.tenant' })}：${nameSplit[1]}）`
      : `${nameSplit[0]}`;
  } else {
    entityName = val?.entity_name;
  }
  return entityName;
};
