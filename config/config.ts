import { defineConfig } from 'umi';
import routes from "./routes";

export default defineConfig({
  routes: [...routes],
  npmClient: 'pnpm',
  icons: {},
  model: {},
  clickToComponent: {},
  // clientLoader: {},
  favicons: ['/assets/favicon.ico'],
  extraPostCSSPlugins: [
    // 配置具体含义见：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    require("postcss-px-to-viewport-8-plugin")({
      viewportWidth: 750,
      selectorBlackList: ['keep-px'], 
    })
  ],
  plugins: [require.resolve("@umijs/plugins/dist/model")],
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
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
