var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var index = require('./api/routes/index');
var app = express();

app.use(morgan('dev'));

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

app.use('/', index);

var env = process.env.NODE_ENV || 'production';

if (env === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, './build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });
}

if (env === 'development') {
  app.get('/*', function(req, res) {
    res.send('REST API running in development mode');
  });
}

module.exports = app;
