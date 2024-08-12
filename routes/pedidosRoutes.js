import express from 'express';
import PedidosController from '../controllers/PedidosController.js';

const router = express.Router();

// Definir rotas para pedidos
router.get('/', PedidosController.getAllPedidos);
router.get('/:id', PedidosController.getPedidoById);
router.post('/', PedidosController.createPedido);
router.put('/:id', PedidosController.updatePedido);
router.delete('/:id', PedidosController.deletePedido);

export default router;
