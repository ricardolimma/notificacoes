import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Observable, timer, switchMap, map } from 'rxjs';

export interface Notificacao {
  mensagemId: string;
  conteudoMensagem: string;
  status: 'AGUARDANDO_PROCESSAMENTO' | 'PROCESSADO_SUCESSO' | 'FALHA_PROCESSAMENTO' | 'DESCONHECIDO';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  enviar(conteudoMensagem: string, mensagemId?: string) {
    const id = mensagemId ?? uuidv4();
    return this.http.post<{ mensagemId: string; status: string }>(
      `${this.baseUrl}/api/notificar`,
      { mensagemId: id, conteudoMensagem }
    );
  }

  consultarStatus(mensagemId: string) {
    return this.http.get<{ mensagemId: string; status: string }>(
      `${this.baseUrl}/api/notificacao/status/${mensagemId}`
    );
  }

  pollingStatus(mensagemId: string, intervalMs = 3000): Observable<string> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.consultarStatus(mensagemId)),
      map(r => r.status)
    );
  }
}
