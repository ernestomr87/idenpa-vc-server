import express from 'express';
const router = express.Router();

import { default as controllers } from '../controllers';
const { infrastructure, inversion } = controllers;

router.get('/api/infrastructure', infrastructure.list);
router.get('/api/infrastructure/:id', infrastructure.getById);
router.post('/api/infrastructure', infrastructure.add);
router.put('/api/infrastructure/:id', infrastructure.update);
router.delete('/api/infrastructure/:id', infrastructure.delete);

router.get('/api/inversion', inversion.list);
router.get('/api/inversion/:id', inversion.getById);
router.post('/api/inversion', inversion.add);
router.put('/api/inversion/:id', inversion.update);
router.delete('/api/inversion/:id', inversion.delete);

export default router;
