import { jest } from '@jest/globals';
import { Status } from '../src/statusStore.js';

const mockAck = jest.fn();
const mockNack = jest.fn();
const mockSendToQueue = jest.fn();
const mockConsume = jest.fn((queue, cb) => {
  // Simula mensagem recebida
  const msg = {
    content: Buffer.from(JSON.stringify({ mensagemId: 'id-1', conteudoMensagem: 'Teste' })),
  };
  cb(msg);
});

jest.unstable_mockModule('../src/amqp.js', () => ({
  getChannel: jest.fn(async () => ({
    consume: mockConsume,
    sendToQueue: mockSendToQueue,
    ack: mockAck,
    nack: mockNack,
  }))
}));

let startConsumer;
beforeAll(async () => {
  ({ startConsumer } = await import('../src/consumer.js'));
});

describe('consumer', () => {
  beforeEach(() => {
    mockAck.mockClear();
    mockNack.mockClear();
    mockSendToQueue.mockClear();
  });

  test('processa mensagem e publica status', async () => {
    await startConsumer();
    expect(mockSendToQueue).toHaveBeenCalled();
    expect(mockAck).toHaveBeenCalled();
  });

  test('nack em erro de processamento', async () => {
    mockConsume.mockImplementationOnce((queue, cb) => {
      cb({ content: Buffer.from('invalid json') });
    });
    await startConsumer();
    expect(mockNack).toHaveBeenCalled();
  });
});
