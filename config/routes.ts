export default [
  {
    path: '/',
    component: './main',
    // layout: false,
    routes: [
      {
        path: '/node',
        name: 'node',
        component: './main/search/node',
      },
      {
        path: '/disk',
        name: 'disk',
        component: './main/search/disk',
      },
      {
        path: '/cluster',
        name: 'cluster',
        component: './main/search/cluster',
      },
      {
        path: '/deploy',
        name: 'deploy',
        component: './main/search/deploy',
      },
    ],
  },
  // 404
  {
    component: './404',
  },
];
