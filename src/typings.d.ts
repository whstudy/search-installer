declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare namespace API {
  import type { MessageApi } from 'antd/lib/message';
  import type { NotificationApi } from 'antd/lib/notification';

  type LoginResult = {
    code?: number;
    success?: boolean;
    data?: {
      jwt?: string;
      user?: {
        user_id?: string;
        username?: string;
        email?: string;
        is_active?: string;
        role?: string;
      };
    };
    msg?: string;
  };

  type LoginParams = {
    name?: string;
    username?: string;
    password?: string;
  };

  type CurrentUser = {
    name?: string;
    user_id?: string;
    username?: string;
    email?: string;
    is_active?: string;
    role?: string;
    unreadCount?: number;
    licenseCluster?: any;
    licenseNodes?: any;
  };
  type GlobalConfig = {
    featurePACS?: boolean;
    featureTiering?: boolean;
    stateRgwReady?: boolean;
    statePwdChanged?: boolean;
    stateOpenwizard?: boolean;
    rgwCacheEnabled?: boolean;
  };
  type CurrentCluster = {
    customIdentity: string;
    desc: string;
    health: string;
    health_msg: string[];
    id: string;
    ip: string;
    is_local: boolean;
    name: string;
    status: string;
    total: number;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type LicenseType = {
    cluster_id?: string;
    cluster_name?: string;
    authorized_node_count?: number;
    activation_node_count?: number;
    probation_node_count?: number;
    free_key_count?: number;
    key_num?: number;
    license_state?: number;
    licensed_user?: string;
    to_be_activated_key?: number;
    left_time?: string;
    waiting_recycling_key?: number;
  };

  type AuthorizeInfo = {
    title: string;
    funType: string;
    needConfirmation: boolean;
    uuid: string;
  };
  type LicenseAdditionkey = {
    key: string;
    state: number;
    type: string;
  };
  type poolPerfData = {
    predict_capacity?: perfData[];
    total_capacity?: perfData[];
    used_capacity?: perfData[];
    total_capacity: perfData[];
    used_capacity: perfData[];
    predict_capacity: perfData[];
    riops: perfData[];
    wiops: perfData[];
    recover_iops: perfData[];
    rbw: perfData[];
    wbw: perfData[];
    recover_bw: perfData[];
    restructure: perfData[];
  };
  type perfData = {
    mean?: number;
    time?: string;
  };

  type RequestExtend = {
    success: boolean;
    message: MessageApi | null;
    notification: NotificationApi | null;
  };
}
