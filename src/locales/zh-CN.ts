import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import request from './zh-CN/request';
import pages from './zh-CN/pages';
import system from './zh-CN/system';
import pool from './zh-CN/pool';
import resourceGroup from './zh-CN/resourceGroup';
import alarm from './zh-CN/alarm';
import catalog from './zh-CN/catalog';
import dashboard from './zh-CN/dashboard';

import storage from './zh-CN/storage';
import host from './zh-CN/host';
import disk from './zh-CN/disk';
import task from './zh-CN/task';
import graph from './zh-CN/graph';
import wizard from './zh-CN/wizard';
import bucket from './zh-CN/bucket';
import objectService from './zh-CN/objectService';
import replication from './zh-CN/replication';
import terraTier from './zh-CN/terraTier';
import unioncommon from './zh-CN/unioncommon';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...pages,
  ...globalHeader,
  ...menu,
  ...component,
  ...request,
  ...system,
  ...pool,
  ...resourceGroup,
  ...storage,
  ...alarm,
  ...catalog,
  ...host,
  ...disk,
  ...dashboard,
  ...task,
  ...graph,
  ...wizard,
  ...bucket,
  ...objectService,
  ...replication,
  ...terraTier,
  ...unioncommon,
};
