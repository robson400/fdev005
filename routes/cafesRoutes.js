import express from 'express';
import CafesController from '../controllers/CafesController.js';

const router = express.Router();

// Definir rotas para cafés
router.get('/', CafesController.getAllCafes);
router.get('/:id', CafesController.getCafeById);
router.post('/', CafesController.createCafe);
router.put('/:id', CafesController.updateCafe);
router.delete('/:id', CafesController.deleteCafe);

export default router;
