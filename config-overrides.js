const { override, fixBabelImports, addWebpackPlugin } = require('customize-cra')

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
// module.exports = function override (config, env) {
//   // do stuff with the webpack config...
//   return config
// }
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
)
