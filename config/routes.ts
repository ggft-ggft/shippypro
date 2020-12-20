export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      /* {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      }, */
      {
        path: '/shippy',
        component: './ShippyPro',
      },
      {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/shippy',
              },
              {
                path: '/shippy',
                name: 'shippy',
                icon: 'smile',
                component: './ShippyPro',
              },
              /* {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './ShippyPro',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './ListTableList',
              },
              {
                component: './404',
              }, */
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
