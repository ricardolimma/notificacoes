const store = new Map(); // mensagemId -> status

export const Status = {
  AGUARDANDO: 'AGUARDANDO_PROCESSAMENTO',
  SUCESSO: 'PROCESSADO_SUCESSO',
  FALHA: 'FALHA_PROCESSAMENTO'
};

export function setStatus(id, status) {
  store.set(id, status);
}

export function getStatus(id) {
  return store.get(id) || null;
}

export function hasStatus(id) {
  return store.has(id);
}

export default { setStatus, getStatus, hasStatus, Status };
