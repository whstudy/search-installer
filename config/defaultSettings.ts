import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // primaryColor: '#F5222D',
  layout: 'mix',
  contentWidth: 'Fluid',
  splitMenus: true,
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: false,
  pwa: false,
  logo: '/logo-white.svg',
  iconfontUrl: '/iconfont.js',
  headerHeight: 64,
};

export default Settings;
