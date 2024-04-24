import { Space, message } from 'antd';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { dsmAlertModify } from '@/services/dsm/alert';
import ProForm, {
  ProFormSwitch,
  ProFormDigit,
  DrawerForm,
  ProFormRadio,
} from '@ant-design/pro-form';
import styles from '../index.less';

export type parentProps = {
  handleCancel: (val: boolean) => void;
  changeData: (val) => void;
  drawerVisible: boolean;
  currentData: API.queryalertconf;
};
const AlarmEditDrawer: React.FC<parentProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';

  const submitFun = async (val) => {
    const modifyData = val;
    const defautParam = {
      cluster_id: clusterId,
      id: props.currentData.id,
      alert_config: props.currentData?.alert_title,
      unit: props.currentData.unit,
    };
    modifyData.alert_enabled = val?.alert_enabled === true ? 1 : 0;
    const paramData: any =
      props.currentData.threshold_switch === 1
        ? {
            ...defautParam,
            ...modifyData,
          }
        : {
            ...defautParam,
            threshold: props.currentData.threshold,
            ...modifyData,
          };
    dsmAlertModify({ ...paramData }).then((res) => {
      if ((res as any).success) {
        message.success(res.msg);
        props.changeData(true);
      } else {
        message.error(res.msg);
        props.changeData(false);
      }
    });
    return true;
  };

  const radioOption = [
    {
      value: 5,
      label: intl.formatMessage({
        id: 'monitor.historyAlarm.severity.critical',
        defaultMessage: ' 紧急 ',
      }),
    },
    {
      value: 4,
      label: intl.formatMessage({
        id: 'monitor.historyAlarm.severity.major',
        defaultMessage: ' 重要 ',
      }),
    },
    {
      value: 3,
      label: intl.formatMessage({
        id: 'monitor.historyAlarm.severity.minor',
        defaultMessage: ' 普通 ',
      }),
    },
    {
      value: 2,
      label: intl.formatMessage({
        id: 'monitor.historyAlarm.severity.warning',
        defaultMessage: ' 提示 ',
      }),
    },
    {
      value: 1,
      label: intl.formatMessage({
        id: 'monitor.historyAlarm.severity.information',
        defaultMessage: ' 信息 ',
      }),
    },
  ];
  return (
    <DrawerForm
      onVisibleChange={props.handleCancel}
      title={<FormattedMessage id="alarm.config.edit" defaultMessage="修改配置" />}
      visible={props.drawerVisible}
      onFinish={submitFun}
      drawerProps={{
        destroyOnClose: true,
      }}
      isKeyPressSubmit={true}
      className={styles.drawerContainer}
      submitter={{
        searchConfig: {
          submitText: intl.formatMessage({
            id: 'action.ensure',
            defaultMessage: '确定',
          }),
          resetText: intl.formatMessage({
            id: 'action.cancel',
            defaultMessage: '取消',
          }),
        },
      }}
    >
      <Space direction="vertical">
        <p className={styles.taskInfoTitle}>{props.currentData?.alert_title}</p>
        {props.currentData.threshold_switch === 1 ? (
          <>
            <ProForm.Group>
              <ProFormDigit
                name="threshold"
                label={
                  <>
                    <FormattedMessage
                      id="monitor.config.tableList.threshold"
                      defaultMessage="阈值"
                    />
                    <span>{props.currentData.unit ? `(${props.currentData.unit})` : ''}</span>
                  </>
                }
                initialValue={props.currentData.threshold}
                rules={[
                  {
                    required: true,
                    pattern:
                      props.currentData.unit === '%'
                        ? /^([1-9][0-9]{0,1}|100)$/
                        : /^\+?[1-9][0-9]*$/,
                    message:
                      props.currentData.unit === '%'
                        ? intl.formatMessage({ id: 'monitor.config.threshold.percenTip' })
                        : intl.formatMessage({ id: 'monitor.config.threshold.tip' }),
                  },
                ]}
              />
            </ProForm.Group>
          </>
        ) : (
          ''
        )}
        <ProForm.Group>
          <ProFormRadio.Group
            label={<FormattedMessage id="monitor.historyAlarm.severity" defaultMessage="级别" />}
            rules={[
              {
                required: true,
              },
            ]}
            name="severity"
            initialValue={props.currentData.severity}
            options={radioOption}
            // options={Object.values(severityMap)}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSwitch
            name="alert_enabled"
            initialValue={props.currentData.alert_enabled === 1}
            checkedChildren={
              <FormattedMessage id="monitor.config.tableList.on" defaultMessage="开启" />
            }
            unCheckedChildren={
              <FormattedMessage id="monitor.config.tableList.off" defaultMessage="关闭" />
            }
            rules={[
              {
                required: true,
              },
            ]}
            label={
              <FormattedMessage id="monitor.operation.tableTile.status" defaultMessage="状态" />
            }
          />
        </ProForm.Group>
      </Space>
    </DrawerForm>
  );
};
export default AlarmEditDrawer;
