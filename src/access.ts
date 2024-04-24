import type { IRoute } from 'umi';
import * as _ from 'lodash';
import { hideInMenu } from '../config/menu';
import { default as ALL_ROUTES } from '../config/routes';
import { filterRoutesByDeployMode, getRoutesPaths, getHideRoutesPaths } from '@/utils/route-helper';

// attention: this invoke everytime route change
const isEnable = (route: IRoute, routes: string[]) => {
  const path = route.path || '';
  return routes.some((r) => r === path);
};

export default function access(initialState) {
  const { currentUser, deployMode, globalConfig } = initialState || {};
  const { role = 'user' } = currentUser || {};
  const clonedRoutes = _.cloneDeep(ALL_ROUTES);

  // reset hideInMenu
  while (hideInMenu?.length > 0) {
    hideInMenu.pop();
  }

  // feature pacs ,hide quota route
  if (globalConfig?.featurePACS) {
    hideInMenu.push('/storage/fileService/quota');
  }

  if (!globalConfig?.featureTiering) {
    _.merge(hideInMenu, [
      '/terra-tier',
      '/terra-tier/placement-policy',
      '/terra-tier/migration-policy',
    ]);
  }

  // hideInMenu for render
  getHideRoutesPaths(clonedRoutes as any[], deployMode)?.forEach((p) => {
    hideInMenu.push(p);
  });

  // filter by deployMode for access
  const filterRoutes = filterRoutesByDeployMode(clonedRoutes as any[], deployMode);
  const flattenRoutes = getRoutesPaths(filterRoutes, hideInMenu);

  return {
    denied: false,
    superRoute: (route) => isEnable(route, flattenRoutes) && ['superadmin'].includes(role),
    adminRoute: (route) => isEnable(route, flattenRoutes) && ['superadmin', 'admin'].includes(role),
    normalRoute: (route) => isEnable(route, flattenRoutes),
    super: ['superadmin'].includes(role),
    admin: ['superadmin', 'admin'].includes(role),
  };
}
