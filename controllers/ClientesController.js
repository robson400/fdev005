import Cliente from '../models/ClientesModel.js';

class ClientesController {
    static async createCliente(req, res) {
        try {
            const { nome, email, cpf, telefone } = req.body;

            const novoCliente = await Cliente.create({ nome, email, cpf, telefone });

            res.status(201).json(novoCliente);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar cliente.' });
        }
    }

    static async getAllClientes(req, res) {
        try {
            const clientes = await Cliente.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar clientes.' });
        }
    }

    static async getClienteById(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }

            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cliente.' });
        }
    }

    static async updateCliente(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }

            const { nome, email, cpf, telefone } = req.body;
            cliente.nome = nome || cliente.nome;
            cliente.email = email || cliente.email;
            cliente.cpf = cpf || cliente.cpf;
            cliente.telefone = telefone || cliente.telefone;

            await cliente.save();

            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar cliente.' });
        }
    }

    static async deleteCliente(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }

            await cliente.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar cliente.' });
        }
    }
}

export default ClientesController;
