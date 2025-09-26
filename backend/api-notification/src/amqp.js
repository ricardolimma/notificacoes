import amqplib from 'amqplib';
import { AMQP_URL, QUEUE_IN, QUEUE_OUT } from './config.js';

let connection;
let channel;

export async function getChannel() {
  if (channel) return channel;
  connection = await amqplib.connect(AMQP_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_IN, { durable: true });
  await channel.assertQueue(QUEUE_OUT, { durable: true });
  return channel;
}

export async function close() {
  try { await channel?.close(); } catch {}
  try { await connection?.close(); } catch {}
}
