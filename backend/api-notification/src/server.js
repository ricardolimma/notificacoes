import { app } from './app.js';
import { PORT } from './config.js';
import { startConsumer } from './consumer.js';
import { getChannel } from './amqp.js';

async function bootstrap() {
  // Inicializa AMQP e consumidor
  await getChannel();
  await startConsumer();

  app.listen(PORT, () => {
    console.log(`✔ Backend on http://localhost:${PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error('Falha ao iniciar:', e);
  process.exit(1);
});
