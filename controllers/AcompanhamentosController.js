import Acompanhamento from '../models/AcompanhamentosModel.js';

class AcompanhamentosController {
    static async createAcompanhamento(req, res) {
        try {
            const { nome, descricao, preco } = req.body;

            // Validação básica
            if (!nome || !preco) {
                return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
            }

            const novoAcompanhamento = await Acompanhamento.create({ nome, descricao, preco });

            res.status(201).json(novoAcompanhamento);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar acompanhamento.' });
        }
    }

    static async getAllAcompanhamentos(req, res) {
        try {
            const acompanhamentos = await Acompanhamento.findAll();
            res.status(200).json(acompanhamentos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar acompanhamentos.' });
        }
    }

    static async getAcompanhamentoById(req, res) {
        try {
            const acompanhamento = await Acompanhamento.findByPk(req.params.id);

            if (!acompanhamento) {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }

            res.status(200).json(acompanhamento);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar acompanhamento.' });
        }
    }

    static async updateAcompanhamento(req, res) {
        try {
            const acompanhamento = await Acompanhamento.findByPk(req.params.id);

            if (!acompanhamento) {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }

            const { nome, descricao, preco } = req.body;
            acompanhamento.nome = nome || acompanhamento.nome;
            acompanhamento.descricao = descricao || acompanhamento.descricao;
            acompanhamento.preco = preco || acompanhamento.preco;

            await acompanhamento.save();

            res.status(200).json(acompanhamento);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar acompanhamento.' });
        }
    }

    static async deleteAcompanhamento(req, res) {
        try {
            const acompanhamento = await Acompanhamento.findByPk(req.params.id);

            if (!acompanhamento) {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }

            await acompanhamento.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar acompanhamento.' });
        }
    }
}

export default AcompanhamentosController;
