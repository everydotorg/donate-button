module.exports = {
  webpack: {
    configure: webpackConfig => {
      webpackConfig.module.rules[2].oneOf[3].use[0] = {
        loader: webpackConfig.module.rules[2].oneOf[3].use[0],
        options: {
          insert: function (element) {
            document
              .getElementById('every-month-widget')
              .shadowRoot.appendChild(element)
          }
        }
      }
      return webpackConfig
    }
  }
}
