# Backend Express + RabbitMQ (adequado ao teste)

Implements:
- `POST /api/notificar` → valida payload `{ mensagemId (uuid), conteudoMensagem (string) }`, publica em `fila.notificacao.entrada.<QUEUE_SUFFIX>` e retorna **202** com o `mensagemId`.
- **Consumer** → lê da fila de entrada, simula 1–2s, gera **20%** de falha, atualiza cache em memória e publica status em `fila.notificacao.status.<QUEUE_SUFFIX>`.
- `GET /api/notificacao/status/:mensagemId` → retorna `{ mensagemId, status }` do cache.

## Rodar
```bash
cp .env.example .env
npm i
npm run dev
# POST com curl:
curl -X POST http://localhost:3000/api/notificar \
  -H "Content-Type: application/json" \
  -d '{"mensagemId":"a6f5f6d5-1111-4c2a-9d3a-7f6b4e0a1111","conteudoMensagem":"Olá"}'
# GET status:
curl http://localhost:3000/api/notificacao/status/a6f5f6d5-1111-4c2a-9d3a-7f6b4e0a1111
```

## Notas
- Ajuste `QUEUE_SUFFIX` no `.env` (ex.: `ricardo`). As filas ficam:
  - `fila.notificacao.entrada.<suffix>`
  - `fila.notificacao.status.<suffix>`
- Cache em memória (Map) reinicia a cada start (ok para o teste).
- Teste unitário mocka `amqplib` para checar `sendToQueue` com os argumentos corretos.
