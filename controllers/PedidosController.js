import Pedido from '../models/PedidosModel.js';
import ItensDoPedido from '../models/ItensDoPedidoModel.js';
import Cafe from '../models/CafesModel.js';
import Acompanhamento from '../models/AcompanhamentosModel.js';

class PedidosController {
    static async createPedido(req, res) {
        try {
            const { cliente_id, itens } = req.body;

            // Validação básica
            if (!cliente_id || !Array.isArray(itens) || itens.length === 0) {
                return res.status(400).json({ error: 'Campos obrigatórios estão faltando ou itens inválidos.' });
            }

            // Cria o pedido
            const novoPedido = await Pedido.create({ 
                cliente_id, 
                data_pedido: new Date(),
                total: 0 // Inicialmente zero, será atualizado depois
            });

            let total = 0;

            // Adiciona itens ao pedido
            for (const item of itens) {
                const cafe = await Cafe.findByPk(item.cafe_id);
                const acompanhamento = item.acompanhamento_id ? await Acompanhamento.findByPk(item.acompanhamento_id) : null;

                if (!cafe) {
                    return res.status(404).json({ error: `Café com ID ${item.cafe_id} não encontrado.` });
                }

                // Cálculo do preço unitário e subtotal
                const preco_unitario = cafe.preco + (acompanhamento ? acompanhamento.preco : 0);
                const subtotal = preco_unitario * item.quantidade;

                await ItensDoPedido.create({
                    pedido_id: novoPedido.id,
                    cafe_id: item.cafe_id,
                    acompanhamento_id: item.acompanhamento_id || null,
                    quantidade: item.quantidade,
                    preco_unitario,
                    subtotal
                });

                total += subtotal;
            }

            // Atualiza o total do pedido
            novoPedido.total = total;
            await novoPedido.save();

            res.status(201).json(novoPedido);
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            res.status(500).json({ error: 'Erro ao criar pedido.' });
        }
    }

    static async getAllPedidos(req, res) {
        try {
            const pedidos = await Pedido.findAll({
                include: [
                    {
                        model: ItensDoPedido,
                        include: [
                            { model: Cafe, attributes: ['nome', 'preco'] },
                            { model: Acompanhamento, attributes: ['nome', 'preco'] }
                        ]
                    }
                ]
            });
            res.status(200).json(pedidos);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            res.status(500).json({ error: 'Erro ao buscar pedidos.' });
        }
    }

    static async getPedidoById(req, res) {
        try {
            const pedido = await Pedido.findByPk(req.params.id, {
                include: [
                    {
                        model: ItensDoPedido,
                        include: [
                            { model: Cafe, attributes: ['nome', 'preco'] },
                            { model: Acompanhamento, attributes: ['nome', 'preco'] }
                        ]
                    }
                ]
            });

            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            res.status(200).json(pedido);
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            res.status(500).json({ error: 'Erro ao buscar pedido.' });
        }
    }

    static async updatePedido(req, res) {
        try {
            const pedido = await Pedido.findByPk(req.params.id);

            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            const { cliente_id, total } = req.body;
            pedido.cliente_id = cliente_id || pedido.cliente_id;
            pedido.total = total || pedido.total;

            await pedido.save();

            res.status(200).json(pedido);
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            res.status(500).json({ error: 'Erro ao atualizar pedido.' });
        }
    }

    static async deletePedido(req, res) {
        try {
            const pedidoId = req.params.id;

            // Exclui todos os itens relacionados ao pedido
            await ItensDoPedido.destroy({
                where: { pedido_id: pedidoId }
            });

            // Agora exclui o pedido
            const pedido = await Pedido.findByPk(pedidoId);

            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            await pedido.destroy();
            res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            res.status(500).json({ error: 'Erro ao deletar pedido.' });
        }
    }
}

export default PedidosController;
