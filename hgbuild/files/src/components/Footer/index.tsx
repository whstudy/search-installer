import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';
import styles from './index.less';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '版权所有：2021-2024 联想开天',
  });

  return <DefaultFooter copyright={`${defaultMessage}`} className={styles.footer} />;
};
