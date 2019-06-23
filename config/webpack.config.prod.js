const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const MODULES_DIR = path.resolve(ROOT_DIR, 'node_modules');

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      // sass
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer('last 2 version')],
              sourceMap: true
            }
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      maxSize: 2500000,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: MODULES_DIR,
          name: 'vendor',
          enforce: true
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    // clean dist folder
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'assets/images/favicon.ico',
      inject: true,
      sourceMap: true,
      chunksSortMode: 'dependency'
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new OfflinePlugin({
      caches: 'all',
      responseStrategy: 'network-first',
      autoUpdate: true,
      AppCache: false,
      ServiceWorker: {
        minify: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    // load `moment/locale/nl.js` and `moment/locale/ru.js`
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nl|ru/),
  ],
};

if (process.env.NODE_ANALYZE) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, prodConfig);
