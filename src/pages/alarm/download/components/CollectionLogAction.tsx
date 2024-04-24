import { useIntl, FormattedMessage, useModel } from 'umi';
import {
  Alert,
  Row,
  Col,
  Space,
  Form,
  Button,
  DatePicker,
  Transfer,
  Checkbox,
  Typography,
  Tooltip,
  Spin,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useEffect, useState, useRef } from 'react';
import IconFont from '@/components/IconFont';
import _ from 'lodash';
import RightDrawer from '@/components/RightDrawer';
import { dsmLogCollectionGet, dsmLogCollection } from '@/services/dsm/log';
import styles from '../index.less';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const TextLink = Typography?.Link;
const LocalePrefix = 'monitor.logDownload.collectForm.';

export type parentProps = {
  actionMode: string;
  setActionMode: (val) => void;
  afterOperation: (val) => void;
};

const CollectionLogAction: React.FC<parentProps> = ({
  actionMode,
  setActionMode,
  afterOperation,
}) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';
  const [nodeDataLoading, setNodeDataLoading] = useState<boolean>(false);
  const [transferNodeData, setTransferNodeData] = useState<[]>([]); // 节点Transfer数据源
  const [transferEnableData, setTransferEnableData] = useState<any[]>([]); // Transfer数据源可选择节点
  const [targetKeys, setTargetKeys] = useState<number[]>([]); // 节点Transfer 右边已选择数据
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]); // 节点Transfer 左边已勾选的，主要用于判断全选状态
  const [ruleCheckState, setRuleCheckStatus] = useState(false); // 节点Transfer 全选checkBox 的状态
  const [rangeTimeValue, setRangeTimeValue] = useState<any>();

  const formRef = useRef<any>(null);

  const timeRangeLabel = {
    lastWeek: intl.formatMessage({
      id: `${LocalePrefix}timeRange.lastWeek`,
      defaultMessage: '最近一周',
    }),
    lastDays: intl.formatMessage({
      id: `${LocalePrefix}timeRange.lastDays`,
      defaultMessage: '最近十四天',
    }),
    lastMonth: intl.formatMessage({
      id: `${LocalePrefix}timeRange.lastMonth`,
      defaultMessage: '最近一周',
    }),
  };

  const onRangeChange = (val: any) => {
    if (!_.isEmpty(val)) {
      setRangeTimeValue({
        start_time: Math.floor(new Date(val[0]).getTime() / 1000),
        end_time: Math.floor(new Date(val[1]).getTime() / 1000),
      });
    } else {
      setRangeTimeValue({});
    }
  };

  const formatNodeData = (nodeValue) => {
    if (!_.isEmpty(nodeValue)) {
      const list = nodeValue.map((item) => {
        const nodeIcon = item?.status === 'normal' ? 'icon-node1' : 'icon-node-error';
        const nodeNameItem = (
          <Row align="middle">
            <IconFont type={nodeIcon} className={`pe-2 ${styles.hostNameIcon}`} />
            <Tooltip
              title={item?.node_name}
              getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
            >
              <Text ellipsis style={{ maxWidth: 'calc(100% - 25px)' }}>
                {item?.node_name}
              </Text>
            </Tooltip>
          </Row>
        );
        return {
          key: item?.host_id,
          title: nodeNameItem,
          disabled: item?.status === 'error',
        };
      });

      const systemLogTitle = (
        <Row align="middle">
          <IconFont type="icon-log-system" className={`pe-2 ${styles.hostNameIcon}`} />
          <Tooltip
            title="系统日志"
            getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
          >
            <Text ellipsis style={{ maxWidth: 'calc(100% - 25px)' }}>
              {intl.formatMessage({
                id: `${LocalePrefix}transfer.systemNode`,
                defaultMessage: '系统日志',
              })}
            </Text>
          </Tooltip>
        </Row>
      );
      list.unshift({
        key: 'system',
        title: systemLogTitle,
        disabled: false,
      });
      setTransferEnableData(_.filter(list, ['disabled', false]));
      setTransferNodeData(list);
    } else {
      setTransferNodeData([]);
    }
  };

  /**
   * 获取 节点Transfer数据源   *
   * @param clusterId   集群ID
   *
   */
  const getNodeData = async () => {
    setNodeDataLoading(true);
    try {
      const resp = await dsmLogCollectionGet({
        cluster_id: clusterId,
      });

      setNodeDataLoading(false);
      if (resp.success) {
        formatNodeData(resp?.data?.nodes);
        const keyList = [];
        resp?.data?.nodes?.map((item) => {
          if (!item.disabled) {
            keyList.push(item.key);
          }
        });
        return true;
      }

      return false;
    } catch (error) {
      setNodeDataLoading(false);
      return false;
    }
  };

  /**
   * 节点Transfer 左右数据移动变化
   * @param newTargetKeys
   * @param direction
   * @param moveKeys
   */
  const handleChange = (
    newTargetKeys: number[],
    // direction: TransferDirection,
    // moveKeys: number[],
  ) => {
    setTargetKeys(newTargetKeys);
    setRuleCheckStatus(false);
  };

  /**
   * 节点Transfer 数据选择变化
   * @param sourceSelectedKeys
   * @param targetSelectedKeys
   */
  const handleSelectChange = (sourceSelectedKeys: number[], targetSelectedKeys: number[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  /**
   * 节点Transfer 左侧全选
   * @param e
   */
  const transferSelectAll = (e) => {
    if (e.target.checked) {
      setRuleCheckStatus(true);
      setSelectedKeys(transferEnableData?.map((item) => item.key));
    } else {
      setRuleCheckStatus(false);
      setSelectedKeys([]);
    }
  };

  useEffect(() => {
    getNodeData();
  }, []);

  const onSubmit = async (values) => {
    let listField: number[] = [];
    let otherField: string[] = [];
    if (_.includes(values?.hostId, 'system')) {
      listField = _.without(values?.hostId, 'system');
      otherField = ['system'];
    } else {
      listField = values?.hostId;
    }
    const paramValue = {
      cluster_id: clusterId,
      start_time: rangeTimeValue?.start_time,
      end_time: rangeTimeValue?.end_time,
      resource: {
        node: listField,
        other: otherField,
      },
      name: 'log',
    };

    try {
      const resp = await dsmLogCollection(paramValue);
      if (resp.success) {
        afterOperation(resp?.data?.job_id);
        setActionMode('cancelCollectDrawer');
        return true;
      }
      resp.message?.error(resp.msg);
      return false;
    } catch (error) {
      return false;
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and after today
    return (current && current > moment().endOf('day')) || current < moment().subtract(30, 'd');
  };

  return (
    <RightDrawer
      drawerProps={{ width: 640, maskClosable: false }}
      title={intl.formatMessage({
        id: `${LocalePrefix}title`,
        defaultMessage: '日志信息收集',
      })}
      visible={true}
      onVisibleChange={(s: boolean) => setActionMode('cancelCollectDrawer')}
      footer={false}
    >
      <Spin spinning={nodeDataLoading}>
        {actionMode === 'reCollect' && (
          <>
            <Alert
              message={
                <FormattedMessage
                  id={`${LocalePrefix}reCollectTip`}
                  defaultMessage="重新收集前将清除上一次收集的日志"
                />
              }
              type="info"
              showIcon
              className="systemAlertInfoIconGlobalStyle"
            />
            <br />
          </>
        )}
        <Form
          className={styles.collectForm}
          ref={formRef}
          autoComplete={'off'}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item
            name="timeRange"
            label={intl.formatMessage({
              id: `${LocalePrefix}label.timeRange`,
              defaultMessage: '时间',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: `${LocalePrefix}ruleErr.timeRange`,
                  defaultMessage: '请选择想要收集日志的时间段',
                }),
              },
            ]}
          >
            <RangePicker
              disabledDate={disabledDate}
              ranges={{
                [timeRangeLabel['lastWeek']]: [
                  moment().startOf('day').subtract(6, 'd'),
                  moment().endOf('day'),
                ],
                [timeRangeLabel['lastDays']]: [
                  moment().startOf('day').subtract(13, 'd'),
                  moment().endOf('day'),
                ],
                [timeRangeLabel['lastMonth']]: [
                  moment().startOf('day').subtract(30, 'd'),
                  moment().endOf('day'),
                ],
              }}
              showTime
              format="YYYY-MM-DD HH:mm"
              onChange={onRangeChange}
            />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: `${LocalePrefix}label.log`,
              defaultMessage: '日志',
            })}
          >
            {actionMode === 'collect' && (
              <>
                <Alert
                  message={
                    <FormattedMessage
                      id={`${LocalePrefix}chooseNodeTip`}
                      defaultMessage="选择系统日志或者某些节点进行日志收集，收集完成之后即可下戟"
                    />
                  }
                  type="info"
                  showIcon
                  className="systemAlertInfoIconGlobalStyle"
                />
                <br />
              </>
            )}
            <Form.Item
              name="hostId"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: `${LocalePrefix}ruleErr.log`,
                    defaultMessage: '请选择节点',
                  }),
                },
              ]}
            >
              <Transfer
                dataSource={transferNodeData}
                render={(item) => item.title || ''}
                titles={[
                  <Checkbox
                    checked={ruleCheckState && selectedKeys?.length === transferEnableData?.length}
                    onChange={transferSelectAll}
                  >
                    {intl.formatMessage({
                      id: `${LocalePrefix}transfer.selectAll`,
                      defaultMessage: '全选',
                    })}
                  </Checkbox>,
                  <TextLink
                    onClick={() => {
                      setTargetKeys([]);
                      formRef?.current?.setFieldsValue({ hostId: [] });
                    }}
                  >
                    {intl.formatMessage({
                      id: `${LocalePrefix}transfer.empty`,
                      defaultMessage: '清空',
                    })}
                  </TextLink>,
                ]}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                showSelectAll={false}
                selectAllLabels={[
                  intl.formatMessage({
                    id: `${LocalePrefix}transfer.selectable`,
                    defaultMessage: '可选',
                  }),
                  intl.formatMessage({
                    id: `${LocalePrefix}transfer.selected`,
                    defaultMessage: '已选',
                  }),
                ]}
                oneWay
                style={{ marginBottom: 16 }}
              />
            </Form.Item>
          </Form.Item>
          <br />
          <Form.Item>
            <Space>
              <Button onClick={() => setActionMode('cancelCollectDrawer')}>
                <FormattedMessage id="action.cancel" defaultMessage="取消" />
              </Button>
              <Button type="primary" htmlType="submit" loading={false}>
                <span>
                  <FormattedMessage id="action.ensure" defaultMessage="确定" />
                </span>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </RightDrawer>
  );
};

export default CollectionLogAction;
