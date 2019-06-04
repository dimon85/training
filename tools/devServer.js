/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import morgan from 'morgan';
import clearConsole from 'react-dev-utils/clearConsole';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import chalk from 'chalk';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/webpack.config.dev';
import routes from './server/routes';


// require('./database'); // need this line otherwise app won't know about the database module

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

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', "http://localhost:3333"); // can't use * with credentials
  res.header('Access-Control-Allow-Credentials', true); //need for setting cookies with express
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Accept, Content-Type, Cookie, Authorization");
  if (req.method === "OPTIONS") {
    res.header({
      "Access-Control-Allow-Methods": "PUT, POST, DELETE"
    });
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1', expressJWT({
  secret: 'secret_string',
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({
  path: [
    '/api/v1/auth/login',
    '/api/v1/auth/register',
    '/api/v1/translation',
  ]
}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

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