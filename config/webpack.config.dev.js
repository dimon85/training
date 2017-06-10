const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|ico|gif|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: ['url-loader'],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer('last 2 version')];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ],
      },
      {
        test: /\.(jpe?g)(\?.*)?$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ProgressBarPlugin({
      format: '  Build [:bar] ' + ':percent' + ' (:elapsed seconds)',
      clear: false,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: './',
        postcss: [
          require('postcss-import'),
          require('postcss-cssnext'),
        ],
      },
    }),
  ],
};