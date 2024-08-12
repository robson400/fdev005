import Cliente from './ClientesModel.js';
import Pedido from './PedidosModel.js';
import ItensDoPedido from './ItensDoPedidoModel.js';
import Cafe from './CafesModel.js';
import Acompanhamento from './AcompanhamentosModel.js';

// Associações
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });

Pedido.hasMany(ItensDoPedido, { foreignKey: 'pedido_id', onDelete: 'CASCADE' });
ItensDoPedido.belongsTo(Pedido, { foreignKey: 'pedido_id', onDelete: 'CASCADE' });

ItensDoPedido.belongsTo(Cafe, { foreignKey: 'cafe_id' });
Cafe.hasMany(ItensDoPedido, { foreignKey: 'cafe_id' });

ItensDoPedido.belongsTo(Acompanhamento, { foreignKey: 'acompanhamento_id' });
Acompanhamento.hasMany(ItensDoPedido, { foreignKey: 'acompanhamento_id' });
