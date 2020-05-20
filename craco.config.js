
const { when } = require('@craco/craco')
const { argv } = require('yargs')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CracoLessPlugin = require('craco-less')

module.exports = function (env) {
  return {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            javascriptEnabled: true
          }
        }
      }
    ],
    babel: {
      plugins: [
        ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': true }]
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
          mode: argv.mode,
          externals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
          }
        }
      }
    }
  }
}
