import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import { FormattedMessage } from 'umi';

const { Link } = Typography;

const DropdownAction = ({ actions, record }) => {
  return (
    <Dropdown.Button
      // destroyPopupOnHide={true}
      trigger={['click']}
      placement="bottomCenter"
      // getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
      arrow
      overlay={() => (
        <Menu defaultSelectedKeys={[actions?.[0]?.key]}>
          {actions.map((m, n) =>
            m?.render ? (
              <Menu.Item key={`${n};${m.key}`}>{m?.render}</Menu.Item>
            ) : (
              <Menu.Item key={`${n};${m.key}`} onClick={(e) => m.handleClick(record, e)}>
                <FormattedMessage id={m.locale} />
              </Menu.Item>
            ),
          )}
        </Menu>
      )}
      buttonsRender={() => [
        null,
        <Link>
          <MoreOutlined className="px-2" />
        </Link>,
      ]}
    />
  );
};

export default DropdownAction;
