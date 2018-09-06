'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./api/routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(
  _bodyParser2.default.urlencoded({
    extended: false
  })
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', _index2.default);

var env = process.env.NODE_ENV || 'production';

if (env === 'production') {
  // Serve any static files
  app.use(_express2.default.static(_path2.default.join(__dirname, './build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(_path2.default.join(__dirname, './build', 'index.html'));
  });
}

if (env === 'development') {
  app.get('/*', function(req, res) {
    res.send('REST API running in development mode');
  });
}

exports.default = app;
