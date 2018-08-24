var express = require('express');
var router = express.Router();

const infrastructureController = require('../controllers').infrastructure;
const inversionController = require('../controllers').inversion;

router.get('/api/infrastructure', infrastructureController.list);
router.get('/api/infrastructure/:id', infrastructureController.getById);
router.post('/api/infrastructure', infrastructureController.add);
router.put('/api/infrastructure/:id', infrastructureController.update);
router.delete('/api/infrastructure/:id', infrastructureController.delete);

router.get('/api/inversion', inversionController.list);
router.get('/api/inversion/:id', inversionController.getById);
router.post('/api/inversion', inversionController.add);
router.put('/api/inversion/:id', inversionController.update);
router.delete('/api/inversion/:id', inversionController.delete);


module.exports = router;
