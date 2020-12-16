const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const mode = process.env.NODE_ENV || "production";

module.exports = {
  output: {
    filename: `worker.${mode}.js`,
    path: path.join(__dirname, "dist"),
  },
  mode,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
};
