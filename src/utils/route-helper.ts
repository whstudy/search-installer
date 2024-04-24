import type { IRoute } from 'umi';
import * as _ from 'lodash';

function filterByDeployMode(route: IRoute, modes: string[]) {
  // prior to check the deplyMode config of children route
  if (route?.routes?.length && route.routes.length > 0) {
    route.routes = route?.routes.filter((c: any) => {
      return filterByDeployMode(c, modes);
    });
    return route.routes?.length > 0 ? true : false;
  } else {
    return route?.deployMode?.some((m) => modes.includes(m));
  }
}

// get all accessable route array
function filterRoutesByDeployMode(routes: IRoute[], modes = ['tfs']) {
  if (routes?.length <= 0) {
    return [];
  }
  return routes.filter((r: IRoute) => filterByDeployMode(r, modes));
}

// get all accessable path array
function getRoutesPaths(routes: IRoute[], hideInMenu: string[] = []) {
  const getRoutePaths = (route: IRoute, prefix = '', result = new Set()) => {
    if (route?.path !== prefix) {
      prefix += (route?.path?.startsWith('/') ? '' : '/') + route?.path;

      if (prefix && !hideInMenu.includes(prefix)) {
        result.add(prefix);
      }
    }
    if (route?.routes && route.routes?.length > 0) {
      route.routes.forEach((r) => {
        return getRoutePaths(r, prefix, result);
      });
    }
    return result;
  };

  if (routes?.length <= 0) {
    return [];
  }
  const result: any[] = [];
  routes.forEach((r) => {
    result.push([...getRoutePaths(r)]);
  });
  return result.flatMap((num) => num);
}

function getHideRoutePaths(route: IRoute, modes: string[], prefix = '', result = new Set()) {
  if (route?.path && route.path !== prefix) {
    prefix += (route?.path?.startsWith('/') ? '' : '/') + route?.path;
  }

  if (route?.routes?.length && route.routes.length > 0) {
    route.routes = route?.routes.filter((c) => {
      return getHideRoutePaths(c, modes, prefix, result);
    });
  } else {
    if (route?.deployMode?.every((m) => !modes.includes(m))) {
      prefix && result.add(prefix);
    }
  }
  return result;
}

// get all paths of hidden routes
function getHideRoutesPaths(routes: IRoute[], modes: string[] = ['tfs']) {
  if (routes?.length <= 0) {
    return [];
  }
  const result: any[] = [];
  routes.forEach((r: IRoute) => {
    result.push([...getHideRoutePaths(r, modes)]);
  });
  return result.flatMap((num) => num);
}

const DynamicallyRedirectPath = {
  tfs: {
    '/storage': '/storage/fileService/directory',
  },
  tfs_tos: {
    '/storage': '/storage/fileService/directory',
  },
  tos: {
    '/storage': '/storage/objectService/gateway-router',
  },
};

export { filterRoutesByDeployMode, getRoutesPaths, getHideRoutesPaths, DynamicallyRedirectPath };
