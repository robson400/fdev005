import { DataTypes } from 'sequelize';
import { db } from '../config/Conexao.js';

const ItensDoPedido = db.define('ItensDoPedido', {
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Pedidos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    cafe_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Cafes',
            key: 'id'
        }
    },
    acompanhamento_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Acompanhamentos',
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'ItensDoPedido',
    timestamps: false
});

export default ItensDoPedido;
