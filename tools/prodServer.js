import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './server/routes';

const customPort = 3113;
const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));
app.use(allowCrossDomain);
app.use(morgan('combined'));


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

//routers
app.use('/api/v1', [routes]);

// Don't expose any software information to potential hackers.
app.disable('x-powered-by');

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});

app.listen(customPort, () => console.log(`Listening on port ${customPort}`));