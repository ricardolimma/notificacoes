import { jest } from '@jest/globals';

const mockSendToQueue = jest.fn(() => true);

jest.unstable_mockModule('../src/amqp.js', () => ({
  getChannel: jest.fn(async () => ({
    sendToQueue: mockSendToQueue
  }))
}));

let publishEntrada;
beforeAll(async () => {
  ({ publishEntrada } = await import('../src/publisher.js'));
});

describe('publisher', () => {
  beforeEach(() => mockSendToQueue.mockClear());

  test('publica payload na fila correta', async () => {
    const payload = { mensagemId: '11111111-1111-4111-8111-111111111111', conteudoMensagem: 'Olá' };
    const ok = await publishEntrada(payload);
    expect(ok).toBe(true);
    expect(mockSendToQueue).toHaveBeenCalledTimes(1);
    const [queue, buffer, opts] = mockSendToQueue.mock.calls[0];
    expect(queue).toMatch(/^fila\.notificacao\.entrada\./);
    expect(JSON.parse(buffer.toString())).toEqual(payload);
    expect(opts).toMatchObject({ persistent: true });
  });
});
