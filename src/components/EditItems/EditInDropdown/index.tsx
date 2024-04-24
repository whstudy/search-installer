import { EditFilled } from '@ant-design/icons';
import { useControllableValue, useEventListener } from 'ahooks';
import { Dropdown, Space, Typography } from 'antd';
import { Access, FormattedMessage, useAccess } from 'umi';
import styles from './index.less';

const TextLink = Typography.Link;
type propsType = {
  value: any; // 编辑项显示值，字符串选择在外部完成格式化
  name: string | [string]; // 编辑项name
  EditForm: (props) => JSX.Element; // 变更表单
  formatter?: () => any; // 计划参数：如需，用来格式化显示值。
  onChange?: (value) => void; // 计划参数：如需，操作时触发外部某个变更。
  isNullable?: () => boolean | [any]; // 计划参数：如需控制空值条件，否则默认效果同??。
};
export default (props: propsType) => {
  const { name, value, EditForm } = props || {};
  const { admin } = useAccess();
  const isUnset = value === undefined || value === null; // 接受父级控制
  const [visible, setVisible] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: `${name}Visible`, // 可受父级该字段影响
    trigger: `set${name}Visible`, // 可受父级该字段影响
  });

  // // 详情监听click事件，点击非弹框区域以关闭弹框
  // useEventListener(
  //   'click',
  //   (e) => {
  //     visible && setVisible(false);
  //   },
  //   { target: document.getElementsByClassName('ant-drawer-open')?.[0] },
  // );

  return (
    <>
      <Space size={16} direction="horizontal" className="value-box">
        {isUnset ? (
          <div className="no-value">
            <FormattedMessage id="value.unset" defaultMessage="未设置" />
          </div>
        ) : (
          value
        )}
        <Access accessible={admin}>
          <Dropdown
            getPopupContainer={(triggerNode) =>
              triggerNode?.parentNode?.parentNode?.parentNode as HTMLElement
            }
            overlay={<EditForm setVisible={setVisible} className={styles.dropdownCard} />}
            trigger={['click']}
            placement="bottomCenter"
            visible={visible}
            arrow={false}
            destroyPopupOnHide
          >
            <TextLink>
              <EditFilled
                onClick={(e) => {
                  setVisible(true);
                  // e.stopPropagation();
                }}
              />
            </TextLink>
          </Dropdown>
        </Access>
      </Space>
    </>
  );
};
