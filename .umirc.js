
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
      { path: '/', component: './index' },
      { path: '/login', component: './login'},
      { path: '/register', component: './register'},
      // // { path: '/list', component: './b', Routes: ['./routes/PrivateRoute.js'] },
      // { path: '/users', component: './users/_layout',
      //   routes: [
      //     { path: '/users/detail', component: './users/detail' },
      //     { path: '/users/:id', component: './users/id' }
      //   ]
      // },
  ],
  proxy: {
    "/data": {
      target: "http://localhost:9093",
      changeOrigin: true,
      pathRewrite: {'^/data': ''}
    }
  },
}
