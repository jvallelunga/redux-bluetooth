const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/webapp/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'redux-bluetooth.webapp.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['latest'],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
};
