module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,

  pwa: {
    name: 'Dogars',
    themeColor: '#bb0090'
  },
	pluginOptions: {
    webpackBundleAnalyzer: {
        openAnalyzer: false
    }
  },
  configureWebpack: {
    resolve: {
      modules: [ __dirname + '/node_modules/vue-awesome' ]
    }
  }
}
