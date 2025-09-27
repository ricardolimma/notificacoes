
# API Notification Backend

Este projeto é o backend do sistema de notificações, desenvolvido em Node.js com Express e RabbitMQ.

## Estrutura
- `src/app.js` — Inicialização da aplicação Express
- `src/server.js` — Inicialização do servidor
- `src/amqp.js` — Configuração do RabbitMQ
- `src/publisher.js` — Publicação de mensagens
- `src/consumer.js` — Consumo de mensagens
- `src/statusStore.js` — Armazenamento de status das notificações
- `test/publisher.test.js` — Testes do publisher

## Instalação

1. Instale as dependências:
	```powershell
	npm install
	```

2. Configure o RabbitMQ:
	- Certifique-se de que o RabbitMQ está rodando localmente na porta padrão 5672.
	- Altere as configurações em `.env` se necessário.

3. Execute o servidor:
	```powershell
	npm run dev
	```
	O backend estará disponível em: http://localhost:3000

## Testes

Para rodar os testes:
```powershell
npm test
```


## Endpoints REST

- `POST /api/notificar`
	- Envia uma nova notificação para processamento.
	- Body: `{ conteudoMensagem: string, mensagemId?: string }`
	- Resposta: `{ mensagemId: string, status: 'AGUARDANDO_PROCESSAMENTO' }`

- `GET /api/notificacao/status/:mensagemId`
	- Consulta o status da notificação.
	- Resposta: `{ mensagemId: string, status: string }` ou 404 se não encontrado.

## Fluxo de Mensagens
1. O frontend envia uma requisição para `POST /api/notificar`.
2. O backend publica a mensagem na fila RabbitMQ.
3. O consumidor processa a mensagem de forma assíncrona e atualiza o status em memória.
4. O frontend consulta o status via `GET /api/notificacao/status/:mensagemId` (polling).

## Variáveis de Ambiente
Consulte o arquivo `.env.example` para configurar as variáveis necessárias.

---

Para dúvidas ou sugestões, entre em contato com o responsável pelo projeto.
