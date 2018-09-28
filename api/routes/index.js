var express = require('express');
var router = express.Router();

var controllers = require('../controllers');

var infrastructure = controllers.infrastructure,
  afectaciones = controllers.afectaciones,
  inversion = controllers.inversion;

//  Infrastructure REST-API//  Infrastructure REST-API

router.get('/api/infrastructure', infrastructure.list);
router.get('/api/infrastructure/:id', infrastructure.getById);
router.post('/api/infrastructure', infrastructure.add);
router.put('/api/infrastructure/:id', infrastructure.update);
router.delete('api/infrastructure/:id', infrastructure.delete);

//  Inversion REST-API
router.get('/api/inversion', inversion.list);
router.get('/api/inversion/:id', inversion.getById);
router.post('/api/inversion', inversion.add);
router.put('/api/inversion/:id', inversion.update);
router.delete('api/inversion/:id', inversion.delete);

//  Inversion REST-API
router.get('/api/afectaciones/agroproductividad', afectaciones.agroproductividad);

module.exports = router;
