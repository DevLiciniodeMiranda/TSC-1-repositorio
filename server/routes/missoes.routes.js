import { Router } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../data/missoes.json');

const FOCOS_VALIDOS = ['estudos', 'academia', 'nextlevel'];
const DIFICULDADES_VALIDAS = ['facil', 'medio', 'dificil'];
const STATUS_VALIDOS = ['pendente', 'concluida', 'falhada'];

async function lerMissoes() {
  const conteudo = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(conteudo);
}

async function salvarMissoes(missoes) {
  await fs.writeFile(DB_PATH, JSON.stringify(missoes, null, 2), 'utf-8');
}

function erroPadronizado(res, status, mensagem, detalhes = []) {
  return res.status(status).json({
    erro: {
      status,
      mensagem,
      detalhes
    }
  });
}

// GET /api/missoes (suporta ?status= e ?foco=)
router.get('/', async (req, res, next) => {
  try {
    const { status, foco } = req.query;
    let missoes = await lerMissoes();

    if (status) {
      missoes = missoes.filter((m) => m.status === String(status).toLowerCase());
    }
    if (foco) {
      missoes = missoes.filter((m) => m.foco === String(foco).toLowerCase());
    }

    return res.status(200).json({
      total: missoes.length,
      dados: missoes
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/missoes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return erroPadronizado(res, 400, 'ID inválido. Informe um número inteiro positivo.');
    }

    const missoes = await lerMissoes();
    const missao = missoes.find((m) => m.id === id);

    if (!missao) {
      return erroPadronizado(res, 404, `Missão com ID ${id} não encontrada.`);
    }

    return res.status(200).json({ dados: missao });
  } catch (err) {
    next(err);
  }
});

// POST /api/missoes
router.post('/', async (req, res, next) => {
  try {
    const { titulo, foco = 'estudos', dificuldade = 'facil', status = 'pendente' } = req.body;
    const detalhes = [];

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
      detalhes.push('O campo "titulo" é obrigatório e deve ter pelo menos 3 caracteres.');
    }
    if (!FOCOS_VALIDOS.includes(String(foco).toLowerCase())) {
      detalhes.push(`O campo "foco" deve ser um de: ${FOCOS_VALIDOS.join(', ')}.`);
    }
    if (!DIFICULDADES_VALIDAS.includes(String(dificuldade).toLowerCase())) {
      detalhes.push(`O campo "dificuldade" deve ser um de: ${DIFICULDADES_VALIDAS.join(', ')}.`);
    }
    if (!STATUS_VALIDOS.includes(String(status).toLowerCase())) {
      detalhes.push(`O campo "status" deve ser um de: ${STATUS_VALIDOS.join(', ')}.`);
    }

    if (detalhes.length > 0) {
      return erroPadronizado(res, 400, 'Dados inválidos para criar a missão.', detalhes);
    }

    const missoes = await lerMissoes();
    const proximoId = missoes.length > 0 ? Math.max(...missoes.map((m) => m.id)) + 1 : 1;

    const novaMissao = {
      id: proximoId,
      titulo: titulo.trim(),
      foco: String(foco).toLowerCase(),
      dificuldade: String(dificuldade).toLowerCase(),
      status: String(status).toLowerCase()
    };

    missoes.push(novaMissao);
    await salvarMissoes(missoes);

    return res.status(201).json({
      mensagem: 'Missão criada com sucesso.',
      dados: novaMissao
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/missoes/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return erroPadronizado(res, 400, 'ID inválido. Informe um número inteiro positivo.');
    }

    const { titulo, foco, dificuldade, status } = req.body;
    const detalhes = [];

    if (titulo !== undefined && (typeof titulo !== 'string' || titulo.trim().length < 3)) {
      detalhes.push('Se informado, "titulo" deve ter pelo menos 3 caracteres.');
    }
    if (foco !== undefined && !FOCOS_VALIDOS.includes(String(foco).toLowerCase())) {
      detalhes.push(`Se informado, "foco" deve ser um de: ${FOCOS_VALIDOS.join(', ')}.`);
    }
    if (dificuldade !== undefined && !DIFICULDADES_VALIDAS.includes(String(dificuldade).toLowerCase())) {
      detalhes.push(`Se informado, "dificuldade" deve ser um de: ${DIFICULDADES_VALIDAS.join(', ')}.`);
    }
    if (status !== undefined && !STATUS_VALIDOS.includes(String(status).toLowerCase())) {
      detalhes.push(`Se informado, "status" deve ser um de: ${STATUS_VALIDOS.join(', ')}.`);
    }

    if (detalhes.length > 0) {
      return erroPadronizado(res, 400, 'Dados inválidos para atualização.', detalhes);
    }

    const missoes = await lerMissoes();
    const indice = missoes.findIndex((m) => m.id === id);

    if (indice === -1) {
      return erroPadronizado(res, 404, `Missão com ID ${id} não encontrada.`);
    }

    const atual = missoes[indice];
    const atualizada = {
      ...atual,
      titulo: titulo !== undefined ? titulo.trim() : atual.titulo,
      foco: foco !== undefined ? String(foco).toLowerCase() : atual.foco,
      dificuldade: dificuldade !== undefined ? String(dificuldade).toLowerCase() : atual.dificuldade,
      status: status !== undefined ? String(status).toLowerCase() : atual.status
    };

    missoes[indice] = atualizada;
    await salvarMissoes(missoes);

    return res.status(200).json({
      mensagem: 'Missão atualizada com sucesso.',
      dados: atualizada
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/missoes/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return erroPadronizado(res, 400, 'ID inválido. Informe um número inteiro positivo.');
    }

    const missoes = await lerMissoes();
    const indice = missoes.findIndex((m) => m.id === id);

    if (indice === -1) {
      return erroPadronizado(res, 404, `Missão com ID ${id} não encontrada.`);
    }

    const [removida] = missoes.splice(indice, 1);
    await salvarMissoes(missoes);

    return res.status(200).json({
      mensagem: 'Missão removida com sucesso.',
      dados: removida
    });
  } catch (err) {
    next(err);
  }
});

export default router;