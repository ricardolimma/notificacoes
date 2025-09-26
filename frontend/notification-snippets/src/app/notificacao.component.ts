import { Component } from '@angular/core';
import { NotificationService, Notificacao } from './notification.service';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [],
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent {
  conteudoMensagem = '';
  notificacoes: Notificacao[] = [];

  constructor(private svc: NotificationService) {}

  enviar() {
    const text = this.conteudoMensagem?.trim();
    if (!text) return;
    this.svc.enviar(text).subscribe((res) => {
      const n: Notificacao = {
        mensagemId: res.mensagemId,
        conteudoMensagem: text,
        status: 'AGUARDANDO_PROCESSAMENTO'
      };
      this.notificacoes = [n, ...this.notificacoes];
      // inicia polling para esse id
      this.svc.pollingStatus(res.mensagemId).subscribe({
        next: (status) => {
          const idx = this.notificacoes.findIndex(x => x.mensagemId === res.mensagemId);
          if (idx >= 0) this.notificacoes[idx] = { ...this.notificacoes[idx], status: status as any };
        },
        error: () => {}
      });
      this.conteudoMensagem = '';
    });
  }
}
