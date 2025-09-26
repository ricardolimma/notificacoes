import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService, Notificacao } from './notification.service';

@Component({
  selector: 'app-root',                 
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  conteudoMensagem: string = '';
  notificacoes: Notificacao[] = [];

  constructor(private svc: NotificationService) {}

  enviar() {
    const text = this.conteudoMensagem.trim();
    if (!text) return;

    this.svc.enviar(text).subscribe((res) => {
      this.notificacoes = [
        { mensagemId: res.mensagemId, conteudoMensagem: text, status: 'AGUARDANDO_PROCESSAMENTO' },
        ...this.notificacoes,
      ];
      this.svc.pollingStatus(res.mensagemId).subscribe((status) => {
        const i = this.notificacoes.findIndex((x) => x.mensagemId === res.mensagemId);
        if (i >= 0) this.notificacoes[i] = { ...this.notificacoes[i], status: status as any };
      });
      this.conteudoMensagem = '';
    });
  }
}
