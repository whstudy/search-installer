export default [
  {
    component: './main',
    layout: false,
    routes: [
      {
        path: '/1',
        name: '1',
        component: './main/search/1',
      },
      {
        path: '/2',
        name: '2',
        component: './main/search/2',
      },
      {
        path: '/3',
        name: '3',
        component: './main/search/3',
      },
      {
        path: '/4',
        name: '4',
        component: './main/search/4',
      },
    ],
  },
  // 404
  {
    component: './404',
  },
];
