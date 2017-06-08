const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
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
            },
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
      'theme',
      'theme/fonts',
    ],
    alias: {
      theme: path.resolve(__dirname, 'src', 'theme'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CUSTOM_HOST: JSON.stringify(process.env.CUSTOM_HOST),
        HTTPS: JSON.stringify(process.env.HTTPS),
        RUBY_BACKEND: JSON.stringify(process.env.RUBY_BACKEND),
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