import { useModel, SelectLang, Link, history } from 'umi';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Space, message, Modal } from 'antd';
import { SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import styles from './index.less';
import { isNotEmpty } from '@/utils';
import IconFont from '../IconFont';

export type SiderTheme = 'light' | 'dark';
const JobSyncInterval = 10 * 1000;

const Help: React.FC = () => {
  return (
    <span
      className={styles.action}
      onClick={() => {
        window.open('/help/Lenovo MagnaScale Manager 用户指南.pdf');
      }}
    >
      <IconFont type="icon-bangzhu" style={{ fontSize: '22px' }} />
    </span>
  );
};

const Setting: React.FC = () => {
  return (
    <span className={styles.action}>
      <SettingOutlined />
    </span>
  );
};

const WizardHeaderRight: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster } = initialState || {};
  const clusterId = currentCluster?.id || '';

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className={styles.header}>
      <Space className={styles.lef}>
        <div className={styles.header_logo} id="logo">
          <a>
            <img src="/logo.svg" alt="logo" />
          </a>
        </div>
        {/*<div className={styles.featureName}>installer</div>*/}
      </Space>

      <Space className={styles.rightContent}>
        <SelectLang className={styles.action} />
      </Space>
    </div>
  );
};
export default WizardHeaderRight;
