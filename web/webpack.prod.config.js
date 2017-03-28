const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './index.js',
    //entry point in resources/assets/js/
  ],

  output: {
    filename: 'bundle.js',
    //  output public/js/
    path: resolve(__dirname, 'public/js'),
    //  output path for dev (include in index.blade.php).
  },

  context: resolve(__dirname, 'resources/assets/js'), // where the js code lives.

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SOCKET: JSON.stringify('http://roomio-socket.us-west-2.elasticbeanstalk.com'),
      },
    }),
  ],
};
