const path = require('path');
const webpack = require('webpack');

const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

// show deprecation
// process.traceDeprecation = true;

module.exports = {
  entry: [
    '@babel/polyfill',
    path.join(SRC_DIR, 'index'),
  ],
  resolve: {
    modules: [
      'src',
      'node_modules',
     ],
    extensions: ['.js', '.css', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.resolve(ROOT_DIR, 'node_modules'),
        ],
      },
      // images
      {
        test: /\.(png|ico|gif|svg|jpe?g)(\?[a-z0-9]+)?$/,
        use: 'url-loader',
      },
      // fonts
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader'] }
    ]
  }
};