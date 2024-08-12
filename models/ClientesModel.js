import { DataTypes } from 'sequelize';
import { db } from '../config/Conexao.js';

const Cliente = db.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Clientes',
    timestamps: false
});

export default Cliente;
