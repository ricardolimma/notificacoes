import { getChannel } from './amqp.js';
import { QUEUE_IN, QUEUE_OUT } from './config.js';
import { setStatus, Status } from './statusStore.js';

/** Random int 1..10 */
function rand1to10() { return Math.floor(Math.random() * 10) + 1; }

export async function startConsumer() {
  const ch = await getChannel();
  await ch.consume(QUEUE_IN, async (msg) => {
    if (!msg) return;
    try {
      const content = JSON.parse(msg.content.toString());
      const { mensagemId, conteudoMensagem } = content;

      // Simula processamento 1-2s
      const delay = 1000 + Math.random() * 1000;
      await new Promise(r => setTimeout(r, delay));

      const fail = rand1to10() <= 2; // 20%
      const status = fail ? Status.FALHA : Status.SUCESSO;

      // Atualiza cache
      setStatus(mensagemId, status);

      // Publica status na fila de saída
      ch.sendToQueue(QUEUE_OUT, Buffer.from(JSON.stringify({ mensagemId, status })), { persistent: true });

      ch.ack(msg);
    } catch (e) {
      console.error('Erro processando mensagem:', e);
      ch.nack(msg, false, false); // descarta
    }
  }, { noAck: false });
}
