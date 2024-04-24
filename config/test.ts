import * as _ from 'lodash';
import { getHideRoutesPaths, getRoutePaths } from '../src/access';
import { default as ALL_ROUTES } from './routes';

const clonedRoutes = _.cloneDeep(ALL_ROUTES);

// test get all route paths
const allRoutesPaths = getRoutePaths(clonedRoutes);
console.log('all path count', allRoutesPaths?.length);

// test get all hidden route paths for tfs
const tfsHideRoutesPaths = getHideRoutesPaths(clonedRoutes, ['tfs']);
console.log('tfs hide path count', tfsHideRoutesPaths);

// test get all hidden route paths for tos
const tosHideRoutesPaths = getHideRoutesPaths(clonedRoutes, ['tos']);
console.log('tos hide path count', tosHideRoutesPaths);

// test get all hidden route paths for tfs+tos
const tfsAtosHideRoutesPaths = getHideRoutesPaths(clonedRoutes, ['tfs', 'tos']);
console.log('tfs+tos hide path count', tfsAtosHideRoutesPaths);
