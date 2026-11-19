import express from 'express';
import cors from 'cors';
import missoesRoutes from './routes/missoes.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.status(200).json({ servico: 'NextLevel API', status: 'online' });
});

// Rotas do recurso principal
app.use('/api/missoes', missoesRoutes);

// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    erro: {
      status: 404,
      mensagem: `Rota ${req.method} ${req.originalUrl} não encontrada.`
    }
  });
});

// Middleware global de erro interno (500) e JSON inválido (400)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      erro: {
        status: 400,
        mensagem: 'JSON inválido no corpo da requisição.',
        detalhes: []
      }
    });
  }

  console.error(err);
  res.status(500).json({
    erro: {
      status: 500,
      mensagem: 'Erro interno no servidor da API.',
      detalhes: []
    }
  });
});

app.listen(PORT, () => {
  console.log(`NextLevel API rodando em http://localhost:${PORT}`);
});