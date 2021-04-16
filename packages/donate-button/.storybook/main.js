const path = require('path')
const { merge } = require('webpack-merge')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-postcss",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) =>
    merge(config, {
      resolve: {alias: { src: path.resolve(__dirname, "../src")}}
    }),
}