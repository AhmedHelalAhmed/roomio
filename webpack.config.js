const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js' //entry point in resources/assets/js/
  ],

  output: {
    filename: 'bundle.js', //output public/js/
    path: resolve(__dirname, 'public/js/src'),
    publicPath: 'http://localhost:8080/public/' //output path for dev (include in index.blade.php).
  },

  context: resolve(__dirname, 'resources/assets/js/src'), // where the js code lives.

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'public/js/'),
    publicPath: 'http://localhost:8080/public/',
    proxy: {
      "/api/*": "http://localhost:8888"
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
