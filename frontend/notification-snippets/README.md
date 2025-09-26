# Notification Snippets Frontend

Este projeto é o frontend para o sistema de notificações, desenvolvido em Angular.

## Estrutura
- `src/app/notificacao.component.ts` — Componente principal de notificações
- `src/app/notification.service.ts` — Serviço para comunicação com o backend
- `src/app/notification.service.spec.ts` — Testes do serviço de notificações

## Instalação

1. Instale as dependências:
   ```powershell
   npm install
   ```

2. Execute a aplicação:
   ```powershell
   ng serve
   ```
   Acesse em: http://localhost:4200

## Testes

Para rodar os testes:
```powershell
ng test
```

## Comunicação com o Backend
O serviço de notificações faz requisições para o backend Express/RabbitMQ na rota:
```
http://localhost:3000/api/notificar
```

## Personalização
Adapte os componentes e serviços conforme sua necessidade para integração com outros sistemas ou customização de notificações.

---

Para dúvidas ou sugestões, entre em contato com o responsável pelo projeto.
