const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const semver = require('semver');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const packageJson = require('./package.json');

const VERSION = semver.parse(packageJson.version);
const VERSION_SLUG =
	VERSION.major === 0 ? `${VERSION.major}.${VERSION.minor}` : VERSION.major;
const VERSION_PATH = path.join('dist', 'donate-button', VERSION_SLUG);

const config = {
	/**
	 * Function that mutates the original webpack config.
	 * Supports asynchronous changes when a promise is returned (or it's an async function).
	 *
	 * @param {object} config - original webpack config.
	 * @param {object} env - options passed to the CLI.
	 * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
	 * @param {object} _options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
	 **/
	webpack(config, env, helpers, _options) {
		config.resolve.plugins = [new TsconfigPathsPlugin()];
		delete config.entry.polyfills;
		config.output.path = path.resolve(__dirname, VERSION_PATH);
		config.output.filename = 'index.js';

		if (env.production) {
			const vercelBaseUrl = process.env.VERCEL_URL;
			config.output.publicPath = vercelBaseUrl
				? `https://${vercelBaseUrl}/${VERSION_SLUG}/`
				: `https://assets.every.org/${VERSION_PATH}/`;
			console.log('Building for', config.output.publicPath);

			// Copy assets
			config.plugins.push(
				// Need trailing slash to make sure copy plugin treats as directory
				new CopyPlugin({
					patterns: [{from: 'public', to: `${config.output.path}/`}]
				})
			);
		}

		// Generate index.html directly instead of use a template
		const plugHtml = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0];
		config.plugins[plugHtml.index] = new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			inject: 'head'
		});
	}
};
export default config;
