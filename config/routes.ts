/**
 * 路由配置
 * 更多路由请查询 https://umijs.org/zh-CN/docs/routing
 */
export default [
  { path: '/', component: 'index' },
  { path: '/docs', component: 'docs' },
  { path: '/user', component: 'user' },
  {
    path: '/foo',
    component: 'foo/index',
    wrappers: [
      // 配置路由的高阶组件封装
      '@/wrappers/auth', // 用于路由级别的权限校验
    ],
  },
];
