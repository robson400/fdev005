import express from 'express';
import AcompanhamentosController from '../controllers/AcompanhamentosController.js';

const router = express.Router();

// Definir rotas para acompanhamentos
router.get('/', AcompanhamentosController.getAllAcompanhamentos);
router.get('/:id', AcompanhamentosController.getAcompanhamentoById);
router.post('/', AcompanhamentosController.createAcompanhamento);
router.put('/:id', AcompanhamentosController.updateAcompanhamento);
router.delete('/:id', AcompanhamentosController.deleteAcompanhamento);

export default router;
