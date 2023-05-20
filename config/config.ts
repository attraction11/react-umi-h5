import { defineConfig } from 'umi';
import Global from '../src/utils/global';
import routes from './routes';

export default defineConfig({
  hash: true,
  // define: { ENV: REACT_APP_ENV },
  history: { type: Global.ROUTE_MODE },
  npmClient: 'pnpm',
  icons: {},
  model: {},
  routes: [...routes],
  base: Global.BASE_PATH,
  publicPath: Global.BASE_PATH,
  clickToComponent: {},
  manifest: {},
  // clientLoader: {},
  extraPostCSSPlugins: [
    // 配置具体含义见：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    require('postcss-px-to-viewport-8-plugin')({
      viewportWidth: 360,
    }),
  ],
  plugins: [require.resolve('@umijs/plugins/dist/model')],
  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  proxy: {
    '/api': {
      // 要代理的地址
      target: 'http://api-qa.xxxxx.com',
      //   target: 'https://gtw.xxxxx.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
