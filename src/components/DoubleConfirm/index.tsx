import { WarningOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Input, Modal, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'umi';
import styles from './index.less';

type DoubleConfirmProps = {
  children?: React.ReactNode;
  content: React.ReactNode;
  callback: () => Promise<any>;
  confirmLoading?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
};

const { Title, Text } = Typography;
const DoubleConfirm: React.FC<DoubleConfirmProps> = (props) => {
  const { children, content, callback, confirmLoading = false } = props;
  const [visible, setVisible] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
  });
  const [text, setText] = useState('');
  const [inputState, setInputState] = useState<any>(undefined);

  const handleOk = () => {
    if (['Risk Accepted', '风险已知悉'].includes(text)) {
      callback();
      setVisible(false);
      setText('');
    }
  };

  const textChange = (val) => {
    setText(val);
    if (['Risk Accepted', '风险已知悉'].includes(val)) {
      setInputState('success');
    } else {
      setInputState('error');
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        {children}
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}
        className={styles.wrapper}
        destroyOnClose={true}
        centered
        okText={<FormattedMessage id="action.confirm" defaultMessage="确认" />}
      >
        <Title level={5}>
          <Space>
            <WarningOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
            <Text>
              <FormattedMessage id="confirm.tips2" />
            </Text>
          </Space>
        </Title>
        {content}
        <p style={{ marginBottom: 10 }}>
          <FormattedMessage id="pages.confirm.prefix" />
          <Text code>
            <FormattedMessage id="pages.confirm.text" />
          </Text>
          <FormattedMessage id="pages.confirm.suffix" />
        </p>
        <Input onChange={(e) => textChange(e.target.value)} status={inputState} />
      </Modal>
    </div>
  );
};

export default DoubleConfirm;
