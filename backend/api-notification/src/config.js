import 'dotenv/config';

export const AMQP_URL = process.env.AMQP_URL;
export const QUEUE_SUFFIX = process.env.QUEUE_SUFFIX || 'ricardo';
export const QUEUE_IN = `fila.notificacao.entrada.${QUEUE_SUFFIX}`;
export const QUEUE_OUT = `fila.notificacao.status.${QUEUE_SUFFIX}`;
export const PORT = Number(process.env.PORT || 3000);
