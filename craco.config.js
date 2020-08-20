
const { when } = require('@craco/craco')
const { argv } = require('yargs')
// const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CracoLessPlugin = require('craco-less')

module.exports = function (env) {
  return {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            // javascriptEnabled: true,
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      }
    ],
    babel: {
      plugins: [
        // '@babel/plugin-transform-runtime',
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
      ]
    },
    webpack: {
      plugins: [
        when(argv.analyze, () => new BundleAnalyzerPlugin({
          generateStatsFile: true
        }), () => {})
      ],
      configure: (webpackConfig, { env, paths }) => {
        return {
          ...webpackConfig,
          // module: {
          //   rules: webpackConfig.module.rules.concat({
          //     test: '/\.js$/',
          //     include: [
          //       path.resolve(__dirname, '/node_modules/@qsr/dazzle')
          //     ]
          //   })
          // },
          devServer: {
            ...webpackConfig.devServer,
            hot: true
          },
          mode: argv.production || 'development',
          externals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      }
    }
  }
}
