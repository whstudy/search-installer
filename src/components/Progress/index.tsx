import { Divider, Progress, Row, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { FormattedMessage } from 'umi';
import IconFont from '../IconFont';
import styles from './index.less';

const SEVERITY_MAPPING = [
  {
    icon: <IconFont type="icon-jinji" />,
    title: 'monitor.historyAlarm.severity.critical',
    defaul: ' 紧急 ',
    color: '#CE1126',
    severityNum: 5,
  },
  {
    icon: <IconFont type="icon-zhongyao" />,
    title: 'monitor.historyAlarm.severity.major',
    defaul: ' 重要 ',
    color: '#ee6411',
    severityNum: 4,
  },
  {
    icon: <IconFont type="icon-putonggaojing" />,
    title: 'monitor.historyAlarm.severity.minor',
    defaul: ' 普通 ',
    color: '#ee9611',
    severityNum: 3,
  },
  {
    icon: <IconFont type="icon-jinggao" />,
    title: 'monitor.historyAlarm.severity.warning',
    defaul: ' 警告 ',
    color: '#f2b000',
    severityNum: 2,
  },
  {
    icon: <IconFont type="icon-tishi" />,
    title: 'monitor.historyAlarm.severity.information',
    defaul: ' 信息 ',
    color: '#2A68BF',
    severityNum: 1,
  },
];

// 颜色与提示根据告警配置一般为 阈值配置（必须）， 比阈值更为严重的可用类容量/达到配额等告警（根据是否存在该配置可选）
const CommonProgress: React.FC<any> = ({
  threshold = {
    value: 0,
    severity: 3,
    title: <FormattedMessage id="threshold.overrun" defaultMessage="超过阈值" />,
  },
  available, // 结构同threshold
  numberPercent = 0,
  isShowValue = false,
  source = 'table', // 现在仅处理detail内部进度条
}) => {
  const [visible, setVisible] = useState(false);

  let { value } = threshold || {};
  if (value !== undefined && value !== null) {
    value = Number(value);
  }
  if (typeof numberPercent !== 'number') {
    numberPercent = Number(numberPercent);
  }

  let isOverrun = false;

  let progressColor = '';
  // 超可用告警阈值
  if (available && numberPercent >= 100 - available?.value) {
    isOverrun = true;
    progressColor = SEVERITY_MAPPING?.filter(
      (v) => Number(v?.severityNum) === Number(available?.severity),
    )?.[0]?.color;
  } else if (numberPercent >= value) {
    // 超告警阈值
    isOverrun = true;
    progressColor = SEVERITY_MAPPING?.filter(
      (v) => Number(v?.severityNum) === Number(threshold?.severity),
    )?.[0]?.color;
  }

  progressColor = progressColor || '#2A68BF';

  const positionLeft: string = isShowValue
    ? `calc(((100% - 60px) * ${value / 100}) - 8px)`
    : `calc((100% * ${value / 100}) - 8px)`;

  const progressNode = (
    <Progress
      className={!isShowValue ? 'no-show-value' : ''}
      strokeLinecap="square"
      percent={numberPercent}
      strokeColor={progressColor}
      showInfo={!!isShowValue}
    />
  );

  return (
    <div className={styles.commonProgress}>
      {available && numberPercent >= 100 - available?.value ? (
        <Tooltip
          title={
            <Space>
              <IconFont className="tooltip-icon" type="icon-jinji" />
              {available?.title}
            </Space>
          }
          visible={isOverrun ? visible : false}
          onVisibleChange={setVisible}
        >
          {progressNode}
        </Tooltip>
      ) : numberPercent && numberPercent >= value ? (
        <Tooltip
          title={
            <Space>
              <IconFont className="tooltip-icon" type="icon-jinggao" />
              {threshold?.title ?? (
                <FormattedMessage id="threshold.overrun" defaultMessage="超过阈值" />
              )}
            </Space>
          }
          visible={isOverrun ? visible : false}
          onVisibleChange={setVisible}
        >
          {progressNode}
        </Tooltip>
      ) : (
        progressNode
      )}

      {typeof value !== 'number' ? null : (
        <Tooltip
          title={
            <FormattedMessage
              id="disk.threshold.value"
              values={{ threshold: value }}
              defaultMessage={`阈值： ${value}}`}
            />
          }
        >
          <div
            className="threshold-line"
            style={{
              left: positionLeft, // 8是线宽,方便点击
            }}
          >
            <Divider type="vertical" />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default CommonProgress;
