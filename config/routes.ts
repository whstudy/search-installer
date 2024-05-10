export default [
  {
    path: '/',
    // name: 'main',
    layout: false,
    component: './main',
    routes: [
      {
        path: '/',
        name: 'two',
        component: './main/search/two',
      },
      {
        path: '/one',
        name: 'one',
        component: './main/search/one',
      },
    ],
  },
  // 404
  {
    component: './404',
    deployMode: ['tfs', 'tos'],
  },
];
