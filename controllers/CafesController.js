import Cafe from '../models/CafesModel.js';

class CafesController {
    static async createCafe(req, res) {
        try {
            const { nome, descricao, preco } = req.body;

            // Validação básica
            if (!nome || !preco) {
                return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
            }

            const novoCafe = await Cafe.create({ nome, descricao, preco });

            res.status(201).json(novoCafe);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar café.' });
        }
    }

    static async getAllCafes(req, res) {
        try {
            const cafes = await Cafe.findAll();
            res.status(200).json(cafes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cafés.' });
        }
    }

    static async getCafeById(req, res) {
        try {
            const cafe = await Cafe.findByPk(req.params.id);

            if (!cafe) {
                return res.status(404).json({ error: 'Café não encontrado.' });
            }

            res.status(200).json(cafe);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar café.' });
        }
    }

    static async updateCafe(req, res) {
        try {
            const cafe = await Cafe.findByPk(req.params.id);

            if (!cafe) {
                return res.status(404).json({ error: 'Café não encontrado.' });
            }

            const { nome, descricao, preco } = req.body;
            cafe.nome = nome || cafe.nome;
            cafe.descricao = descricao || cafe.descricao;
            cafe.preco = preco || cafe.preco;

            await cafe.save();

            res.status(200).json(cafe);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar café.' });
        }
    }

    static async deleteCafe(req, res) {
        try {
            const cafe = await Cafe.findByPk(req.params.id);

            if (!cafe) {
                return res.status(404).json({ error: 'Café não encontrado.' });
            }

            await cafe.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar café.' });
        }
    }
}

export default CafesController;
