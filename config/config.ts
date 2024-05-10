import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {
    dark: false,
  },
  dva: {
    hmr: true,
  },
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ios: false,
  },
  routes,
  theme: theme,
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  nodeModulesTransform: { type: 'none', exclude: [] },
  mfsu: {},
  webpack5: {},
  history: { type: 'hash' },
});
