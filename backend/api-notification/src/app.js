import express from 'express';
import cors from 'cors';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { publishEntrada } from './publisher.js';
import { setStatus, getStatus, Status } from './statusStore.js';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/notificar', async (req, res) => {
  try {
    let { mensagemId, conteudoMensagem } = req.body || {};

    if (!mensagemId) mensagemId = uuidv4();
    if (!validateUuid(mensagemId)) {
      return res.status(400).json({ error: 'mensagemId inválido' });
    }
    if (typeof conteudoMensagem !== 'string' || conteudoMensagem.trim().length === 0) {
      return res.status(400).json({ error: 'conteudoMensagem obrigatório' });
    }

    // status inicial
    setStatus(mensagemId, Status.AGUARDANDO);

    await publishEntrada({ mensagemId, conteudoMensagem });

    return res.status(202).json({ mensagemId, status: Status.AGUARDANDO });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'InternalServerError' });
  }
});

app.get('/api/notificacao/status/:mensagemId', (req, res) => {
  const { mensagemId } = req.params;
  const status = getStatus(mensagemId);
  if (!status) return res.status(404).json({ error: 'NotFound' });
  res.json({ mensagemId, status });
});
