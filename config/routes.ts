export default [
  {
    path: '/',
    // name: 'main',
    layout: false,
    component: './main',
    routes: [
      {
        path: '/1',
        name: '1',
        component: './main/search/one',
      },
      {
        path: '/2',
        name: '2',
        component: './main/search/two',
      },
      {
        path: '/3',
        name: '3',
        component: './main/search/two',
      },
      {
        path: '/4',
        name: '4',
        component: './main/search/two',
      },
      // 404
      {
        component: './404',
      },
    ],
  },
  // 404
  {
    component: './404',
  },
];
