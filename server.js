import express from 'express';
import { db } from './config/Conexao.js';  // Importa a conexão com o banco de dados
import cors from 'cors';
import clientesRoutes from './routes/clientesRoutes.js';  // Importa as rotas de clientes
import cafesRoutes from './routes/cafesRoutes.js';  // Importa as rotas de cafés
import acompanhamentosRoutes from './routes/acompanhamentosRoutes.js';  // Importa as rotas de acompanhamentos
import pedidosRoutes from './routes/pedidosRoutes.js';  // Importa as rotas de pedidos
import itensDoPedidoRoutes from './routes/itensDoPedidoRoutes.js';  // Importa as rotas de itens do pedido
import './models/associations.js';

// Inicializa o app Express
const app = express();

app.use(cors());

// Middleware para parsing de JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.send("Início.");
});

// Configura as rotas para as entidades
app.use('/clientes', clientesRoutes);
app.use('/cafes', cafesRoutes);
app.use('/acompanhamentos', acompanhamentosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/itens-do-pedido', itensDoPedidoRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Testa a conexão com o banco de dados e inicia o servidor
db.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        app.listen(3000, () => {
            console.log('Aplicação rodando na porta 3000.');
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });
