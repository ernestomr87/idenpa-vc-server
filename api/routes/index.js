'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

var infrastructure = _controllers2.default.infrastructure,
  inversion = _controllers2.default.inversion;

//  Infrastructure REST-API//  Infrastructure REST-API

router.get('/api/infrastructure', infrastructure.list);
router.get('/api/infrastructure/:id', infrastructure.getById);
router.post('/api/infrastructure', infrastructure.add);
router.put('/api/infrastructure/:id', infrastructure.update);
router.delete('/infrastructure/:id', infrastructure.delete);

//  Inversion REST-API
router.get('/api/inversion', inversion.list);
router.get('/api/inversion/:id', inversion.getById);
router.post('/api/inversion', inversion.add);
router.put('/api/inversion/:id', inversion.update);
router.delete('/inversion/:id', inversion.delete);

exports.default = router;
