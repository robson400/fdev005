import { DataTypes } from 'sequelize';
import { db } from '../config/Conexao.js';  // Importa a instância do Sequelize

const Cafe = db.define('Cafe', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Cafes',
    timestamps: false
});

export default Cafe;
