import path from 'path';
import express from 'express';
import compression from 'compression';

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
app.use(express.static(path.join(__dirname, '../dist')));
app.use(allowCrossDomain);

// Register Node.js middleware
// -----------------------------------------------------------------------------

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});

app.listen(customPort, () => console.log(`Listening on port ${customPort}`));