export default [
  {
    path: '/',
    name: 'main',
    layout: false,
    hideInMenu: false,
    hideNav: false,
    routes: [
      {
        path: '/',
        component: './main',
        access: 'normalRoute',
        deployMode: ['tfs', 'tos'],
        exact: true,
      },
    ],
  },
  // 404
  {
    component: './404',
    deployMode: ['tfs', 'tos'],
  },
];
