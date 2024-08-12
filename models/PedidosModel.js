import { DataTypes } from 'sequelize';
import { db } from '../config/Conexao.js';

const Pedido = db.define('Pedido', {
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes',
            key: 'id'
        }
    },
    data_pedido: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Pedidos',
    timestamps: false
});

export default Pedido;
