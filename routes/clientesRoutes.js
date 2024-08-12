import express from 'express';
import ClientesController from '../controllers/ClientesController.js';

const router = express.Router();

// Definir rotas para clientes
router.get('/', ClientesController.getAllClientes);
router.get('/:id', ClientesController.getClienteById);
router.post('/', ClientesController.createCliente);
router.put('/:id', ClientesController.updateCliente);
router.delete('/:id', ClientesController.deleteCliente);

export default router;
