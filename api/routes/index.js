var express = require('express');
var router = express.Router();

var controllers = require('../controllers');

var infrastructure = controllers.infrastructure,
  afectaciones = controllers.afectaciones,
  inversion = controllers.inversion;

//  Infrastructure REST-API//  Infrastructure REST-API
router.get('/api/infrastructure/:id', infrastructure.getById);


//  Inversion REST-API
router.get('/api/inversion', inversion.list);
router.get('/api/inversion/:id', inversion.getById);
router.post('/api/inversion', inversion.add);
router.put('/api/inversion/:id', inversion.update);
router.delete('api/inversion/:id', inversion.delete);

//  Inversion REST-API
router.get('/api/afectaciones/agroproductividad', afectaciones.agroproductividad);
router.get('/api/afectaciones/agroproductividad/:municipio', afectaciones.agroproductividadByMun);
router.get('/api/afectaciones/parcelasAfectadas', afectaciones.parcelasAfectadas);
router.get('/api/afectaciones/parcelasAfectadas/:municipio', afectaciones.parcelasAfectadasByMun);


module.exports = router;
