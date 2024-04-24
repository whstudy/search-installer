import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pages from './en-US/pages';
import request from './en-US/request';
import system from './en-US/system';
import pool from './en-US/pool';
import resourceGroup from './en-US/resourceGroup';
import alarm from './en-US/alarm';
import catalog from './en-US/catalog';
import dashboard from './en-US/dashboard';
import storage from './en-US/storage';
import host from './en-US/host';
import disk from './en-US/disk';
import task from './en-US/task';
import graph from './en-US/graph';
import wizard from './en-US/wizard';
import bucket from './en-US/bucket';
import objectService from './en-US/objectService';
import replication from './en-US/replication';
import terraTier from './en-US/terraTier';
import unioncommon from './en-US/unioncommon';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  ...globalHeader,
  ...menu,
  ...component,
  ...pages,
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
