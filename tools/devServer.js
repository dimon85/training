/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import morgan from 'morgan';
import clearConsole from 'react-dev-utils/clearConsole';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import chalk from 'chalk';
import config from '../config/webpack.config.dev';

const customPort = 3113;
const app = express();
const compiler = webpack(config);


//
// Register Webpack middleware, hot-reload
// -----------------------------------------------------------------------------
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
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