
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'React-Recruiting',
      dll: true,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
          
        ],
      },
    }],
  ],
  routes: [
      { 
        path: '/user', component: '../layouts/userLayout.js',
        routes: [
          { path: '/user', redirect: '/user/Login' },
          { path: '/user/login', component: './Login' },
          { path: '/user/register', component: './Register' }
        ]
      },
      {
        path: '/', 
        // component: '../layouts/basicLayout.js',
        Routes:['src/pages/Authorized'],
        routes: [
          { path:'/', redirect: '/accout' },
          // { path:'/accout', redirect: '/accout/bossinfo'},
          { path: '/accout/bossinfo', component: './Info/bossinfo'},
          { path: '/accout/geniusinfo', component: './Info/geniusinfo'},
          { 
            path: '/accout',
            component: './accout/_layout',
            routes: [
              {path: '/accout', redirect: '/accout/me'},
              {
                path: '/accout/boss',
                component: './Accout/Boss'
              },
              {
                path: '/accout/genius',
                component: './Accout/Genius'
              },
              {
                path: '/accout/msg',
                component: './Accout/Msg'
              },
              {
                path: '/accout/me',
                component: './Accout/User'
              }
            ]
          }
        ]
      },
      { component: './404.js'}
  ],
  proxy: {
    "/api": {
      target: "http://localhost:9093",
      changeOrigin: true,
      pathRewrite: { "^/api" : "" }
    }
  },
}
