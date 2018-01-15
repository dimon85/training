const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|gif|svg|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: ['url-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      },
      {
        test: /\.(jpe?g|ico)(\?.*)?$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
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
    new ExtractTextPlugin('styles.[hash].css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'assets/images/favicon.ico'
    }),
    new OfflinePlugin({
      caches: {
        main: [
          'styles.*.css',
          'bundle.*.js',
        ]
      }
    }),
  ],
};