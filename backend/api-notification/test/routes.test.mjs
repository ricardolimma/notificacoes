import request from 'supertest';
import { app } from '../src/app.js';
import { Status } from '../src/statusStore.js';

describe('API rotas', () => {
  test('POST /api/notificar cria notificação', async () => {
    const res = await request(app)
      .post('/api/notificar')
      .send({ conteudoMensagem: 'Teste' });
    expect(res.status).toBe(202);
    expect(res.body.mensagemId).toBeTruthy();
    expect(res.body.status).toBe(Status.AGUARDANDO);
  });

  test('GET /api/notificacao/status/:mensagemId retorna status', async () => {
    const postRes = await request(app)
      .post('/api/notificar')
      .send({ conteudoMensagem: 'Teste' });
    const id = postRes.body.mensagemId;
    const getRes = await request(app)
      .get(`/api/notificacao/status/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.mensagemId).toBe(id);
    expect(getRes.body.status).toBe(Status.AGUARDANDO);
  });

  test('GET /api/notificacao/status/:mensagemId retorna 404 para id inexistente', async () => {
    const res = await request(app)
      .get('/api/notificacao/status/inexistente');
    expect(res.status).toBe(404);
  });
});
