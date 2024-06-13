import { SelectLang } from 'umi';
import React from 'react';
import { Space } from 'antd';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';



const LnHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <Space className={styles.lef}>
        <div className={styles.header_logo} id="logo">
          <img src="/lenovo-white.svg" alt="logo" />
          <div>TerraSearch Installer</div>
        </div>
        {/*<div className={styles.featureName}>installer</div>*/}
      </Space>

      <Space className={styles.rightContent}>
        {/*<SelectLang className={styles.action} />*/}
      </Space>
    </div>
  );
};
export default LnHeader;
