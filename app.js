import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import indexRouter from './api/routes/index';

let app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', indexRouter);

const env = process.env.NODE_ENV || 'production';

if (env === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, './client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}

if (env === 'development') {
  app.get('/*', function(req, res) {
    res.send('REST API running in development mode');
  });
}

export default app;
