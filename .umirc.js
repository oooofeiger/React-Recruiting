
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
        component: '../layouts/basicLayout.js',
        Routes:['src/pages/Authorized'],
        routes: [
          { path:'/', redirect: '/accout' },
          { path: '/accout/bossinfo', component: './Info/bossinfo'}
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
