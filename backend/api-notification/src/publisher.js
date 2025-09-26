import { getChannel } from './amqp.js';
import { QUEUE_IN } from './config.js';

/**
 * Publica uma mensagem na fila de entrada.
 * @param {{ mensagemId: string, conteudoMensagem: string }} payload 
 */
export async function publishEntrada(payload) {
  const ch = await getChannel();
  const ok = ch.sendToQueue(QUEUE_IN, Buffer.from(JSON.stringify(payload)), { persistent: true });
  return ok;
}
