const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './#src/index.js',
  output: {
    filename: 'index.[contenthash].js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlPlugin({
      template: './#src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}