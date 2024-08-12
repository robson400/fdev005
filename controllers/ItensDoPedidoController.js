import ItensDoPedido from '../models/ItensDoPedidoModel.js';
import Cafe from '../models/CafesModel.js';
import Acompanhamento from '../models/AcompanhamentosModel.js';

class ItensDoPedidoController {
    static async createItem(req, res) {
        try {
            const { pedido_id, cafe_id, acompanhamento_id, quantidade, preco_unitario, subtotal } = req.body;

            // Validação básica
            if (!pedido_id || !cafe_id || !quantidade || !preco_unitario || !subtotal) {
                return res.status(400).json({ error: 'Campos obrigatórios estão faltando.' });
            }

            const novoItem = await ItensDoPedido.create({ 
                pedido_id, 
                cafe_id, 
                acompanhamento_id, 
                quantidade, 
                preco_unitario, 
                subtotal 
            });

            res.status(201).json(novoItem);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar item do pedido.' });
        }
    }

    static async getAllItens(req, res) {
        try {
            const itens = await ItensDoPedido.findAll({
                include: [
                    { model: Cafe, attributes: ['nome'] },
                    { model: Acompanhamento, attributes: ['nome'] }
                ]
            });
            res.status(200).json(itens);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar itens do pedido.' });
        }
    }

    static async getItemById(req, res) {
        try {
            const item = await ItensDoPedido.findByPk(req.params.id, {
                include: [
                    { model: Cafe, attributes: ['nome'] },
                    { model: Acompanhamento, attributes: ['nome'] }
                ]
            });

            if (!item) {
                return res.status(404).json({ error: 'Item do pedido não encontrado.' });
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar item do pedido.' });
        }
    }

    static async updateItem(req, res) {
        try {
            const item = await ItensDoPedido.findByPk(req.params.id);

            if (!item) {
                return res.status(404).json({ error: 'Item do pedido não encontrado.' });
            }

            const { pedido_id, cafe_id, acompanhamento_id, quantidade, preco_unitario, subtotal } = req.body;
            item.pedido_id = pedido_id || item.pedido_id;
            item.cafe_id = cafe_id || item.cafe_id;
            item.acompanhamento_id = acompanhamento_id || item.acompanhamento_id;
            item.quantidade = quantidade || item.quantidade;
            item.preco_unitario = preco_unitario || item.preco_unitario;
            item.subtotal = subtotal || item.subtotal;

            await item.save();

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar item do pedido.' });
        }
    }

    static async deleteItem(req, res) {
        try {
            const item = await ItensDoPedido.findByPk(req.params.id);

            if (!item) {
                return res.status(404).json({ error: 'Item do pedido não encontrado.' });
            }

            await item.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar item do pedido.' });
        }
    }
}

export default ItensDoPedidoController;
