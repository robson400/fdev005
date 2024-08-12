import express from 'express';
import ItensDoPedidoController from '../controllers/ItensDoPedidoController.js';

const router = express.Router();

// Definir rotas para itens do pedido
router.get('/', ItensDoPedidoController.getAllItens);
router.get('/:id', ItensDoPedidoController.getItemById);
router.post('/', ItensDoPedidoController.createItem);
router.put('/:id', ItensDoPedidoController.updateItem);
router.delete('/:id', ItensDoPedidoController.deleteItem);

export default router;
