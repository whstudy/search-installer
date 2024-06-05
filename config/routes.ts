export default [
  {
    path: '/',
    component: './main',
    // layout: false,
    routes: [
      {
        path: '/one',
        name: 'one',
        component: './main/search/one',
      },
      {
        path: '/two',
        name: 'two',
        component: './main/search/two',
      },
      {
        path: '/three',
        name: 'three',
        component: './main/search/three',
      },
      {
        path: '/four',
        name: 'four',
        component: './main/search/four',
      },
    ],
  },
  // 404
  {
    component: './404',
  },
];
