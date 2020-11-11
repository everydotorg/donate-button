const HtmlWebpackPlugin = require('html-webpack-plugin')

export default {
	/**
	 * Function that mutates the original webpack config.
	 * Supports asynchronous changes when a promise is returned (or it's an async function).
	 *
	 * @param {object} config - original webpack config.
	 * @param {object} env - options passed to the CLI.
	 * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
	 * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
	 **/
	webpack(config, env, helpers, options) {
    delete config.entry.polyfills;
    config.output.filename = "[name].js";
    config.output.publicPath =  'https://assets.every.org/every-month/'
  
    // if (env.production) {
      config.output.libraryTarget = "umd";

      // Generate index.html directly instead of use a template
      const plugHtml = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0]
      config.plugins[plugHtml.index] = new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html'
      })
      
      // Remove css modules and add to string loader.
      let { ruleIndex } = helpers.getLoadersByName(config, 'css-loader')[0]
      config.module.rules[ruleIndex] = {
        test: /\.css$/,
        use: [
          {
            loader: 'to-string-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      }
    // }
	},
};
