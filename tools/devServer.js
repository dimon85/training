/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import clearConsole from 'react-dev-utils/clearConsole';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import chalk from 'chalk';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/webpack.config.dev';
import routes from './server/routes';


require('./database'); // need this line otherwise app won't know about the database module

const customPort = 3333;
const app = express();
const compiler = webpack(config);

//
// Register Webpack middleware, hot-reload
// -----------------------------------------------------------------------------
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/assets/images/')));

//routers
app.use('/api/v1', [routes]);

// for webpack, other routers
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});


const msToTime = (s) => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;

  return `${mins} min ${secs} sec ${ms} ms`;
};


const setupCompiler = (host, port, protocol) => {
  compiler.plugin('invalid', () => {
    clearConsole();
    console.log('Compiling...');
  });

  compiler.plugin('done', (stats) => {
    clearConsole();

    const time = msToTime(stats.endTime - stats.startTime);
    const messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green(`Compiled successfully for  ${time}`));
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log(`${chalk.cyan(`${protocol}://${host}:${port}/`)}`);
      console.log();
    }

    if (messages.errors.length) {
      console.log(chalk.red('Errors in compile process'));
      console.log();
      messages.errors.forEach((message) => {
        console.log(message);
        console.log();
      });
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Warnings in compile process'));
      console.log();
      messages.warnings.forEach((message) => {
        console.log(message);
        console.log();
      });
    }
  });
};

const runDevServer = (host, port) => {
  app.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    clearConsole();
    console.log(chalk.cyan('Starting the development server...'));
    console.log();
  });
};

const run = (port) => {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);

  runDevServer(host, port, protocol);
};

run(customPort);