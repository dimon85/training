import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const TOOLS_DIR = path.resolve(ROOT_DIR, 'tools');

module.exports = {
  mode: 'production',
  entry: [
    path.join(TOOLS_DIR, 'prodServer'),
  ],
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    path: path.join(DIST_DIR, 'server'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less|scss|svg|jpe?g)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    })
  ]
};