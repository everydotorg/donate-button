// function to insert css in the right place in the shadow DOM
var insert = function (element) {
  document.getElementById('every-month-widget').shadowRoot.appendChild(element)
}

// V1.X (accepts `insert` option)
// If react-scripts starts using 1.X we might not need this, we can just override options
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  webpack: {
    configure: webpackConfig => {
      var loader = webpackConfig.module.rules[2].oneOf[3].use[0]

      // During development style-loader is used
      if (webpackConfig.mode === 'development') {
        // Check the loader we're about to overwrite looks like what we expect
        if (!loader?.loader?.match(/style-loader/)) {
          // throw new Error(
          //   'expected mini-css-extract-plugin at .module.rules[2].oneOf[3].use[0]'
          // )
        }

        // convert from string to object with options
        webpackConfig.module.rules[2].oneOf[3].use[0] = {
          loader: loader,
          // custom insert function
          options: { insert: insert }
        }
      } else {
        // In Production builds mini-css-extract-plugin is used instead

        // Check the plugin we're about to overwrite looks like what we expect
        if (
          webpackConfig.plugins[5].constructor.name !== 'MiniCssExtractPlugin'
        ) {
          throw new Error('expected MiniCssExtractPlugin at .plugins[5]')
        }

        // Replace the plugin with our version, including custom insert function
        webpackConfig.plugins[5] = new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          // custom insert function
          insert: insert
        })

        // Check the loader we're about to overwrite looks like what we expect
        if (!loader.loader.match(/mini-css-extract-plugin/)) {
          throw new Error(
            'expected mini-css-extract-plugin at .module.rules[2].oneOf[3].use[0]'
          )
        }
        // Replace loader with our version
        webpackConfig.module.rules[2].oneOf[3].use[0].loader =
          MiniCssExtractPlugin.loader
      }
      return webpackConfig
    }
  }
}
