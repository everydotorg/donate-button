module.exports = {
  style: {
    loaderOptions: {
      insertInto: function () {
        return document.getElementById('every-month-root')
      }
    }
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules[2].oneOf[3].use[0] = {
        loader: webpackConfig.module.rules[2].oneOf[3].use[0],
        options: {
          insertInto: function () {
            return document.getElementById('every-month-widget').shadowRoot
          }
        }
      }
      return webpackConfig
    }
  }
}
