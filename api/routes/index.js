var express = require('express');
var router = express.Router();

var controllers = require('../controllers');

var infrastructure = controllers.infrastructure,
  afectaciones = controllers.afectaciones,
  sitema_agricola = controllers.sitema_agricola,
  inversion = controllers.inversion;

//  Infrastructure REST-API//  Infrastructure REST-API
router.get('/api/infrastructure/:id', infrastructure.getById);


//  Inversion REST-API
router.get('/api/inversion', inversion.list);
router.get('/api/inversion/:id', inversion.getById);
router.post('/api/inversion', inversion.add);
router.put('/api/inversion/:id', inversion.update);
router.delete('api/inversion/:id', inversion.delete);

//  Afectaciones REST-API
router.get('/api/afectaciones/agroproductividad', afectaciones.agroproductividad);
router.get('/api/afectaciones/agroproductividad/:municipio', afectaciones.agroproductividadByMun);
router.get('/api/afectaciones/parcelasAfectadas', afectaciones.parcelasAfectadas);
router.get('/api/afectaciones/parcelasAfectadas/:municipio', afectaciones.parcelasAfectadasByMun);
router.get('/api/afectaciones/usufructuariosAfectados', afectaciones.usufructuariosAfectados);
router.get('/api/afectaciones/usufructuariosAfectados/:municipio', afectaciones.usufructuariosAfectadosByMun);
router.get('/api/afectaciones/ascensoDelNivelMedioDelMar', afectaciones.ascensoDelNivelMedioDelMar);
router.get('/api/afectaciones/ascensoDelNivelMedioDelMar/:municipio', afectaciones.ascensoDelNivelMedioDelMarByMun);
router.get('/api/afectaciones/areaIntrusionMarina', afectaciones.areaIntrusionMarina);
router.get('/api/afectaciones/areaIntrusionMarina/:municipio', afectaciones.areaIntrusionMarinaByMun);

//  Sistema Agricola REST-API
router.get('/api/sitema_agricola/forma_prodictiva/:id', sitema_agricola.forma_prodictiva);
router.get('/api/sitema_agricola/forma_prodictiva/:id/termos', sitema_agricola.termos);
router.get('/api/sitema_agricola/forma_prodictiva/:id/usoTenencia', sitema_agricola.usoTenencia);
// router.get('/api/sitema_agricola/forma_prodictiva/usoTenencia/:id', sitema_agricola.usoTenencia);


module.exports = router;