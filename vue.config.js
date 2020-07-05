const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 配置全局样式
        path.resolve(__dirname, './src/assets/style/varibles.less')
      ]
    }
  }
}
