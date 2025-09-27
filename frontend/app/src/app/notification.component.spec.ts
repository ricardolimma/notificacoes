import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let httpMock: HttpTestingController;
  let svc: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      providers: [NotificationService],
    });
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    svc = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve enviar notificação e adicionar à lista com status AGUARDANDO_PROCESSAMENTO', () => {
    component.conteudoMensagem = 'Teste';
    spyOn(svc, 'pollingStatus').and.returnValue(of('PROCESSADO_SUCESSO'));
    component.enviar();

    const req = httpMock.expectOne('http://localhost:3000/api/notificar');
    expect(req.request.method).toBe('POST');
    req.flush({ mensagemId: 'id-123', status: 'AGUARDANDO_PROCESSAMENTO' }, { status: 202, statusText: 'Accepted' });

    expect(component.notificacoes.length).toBe(1);
    expect(component.notificacoes[0].mensagemId).toBe('id-123');
    expect(component.notificacoes[0].status).toBe('AGUARDANDO_PROCESSAMENTO');
    expect(component.notificacoes[0].conteudoMensagem).toBe('Teste');
  });

  it('deve atualizar o status da notificação após polling', () => {
    component.conteudoMensagem = 'Teste';
    spyOn(svc, 'pollingStatus').and.returnValue(of('PROCESSADO_SUCESSO'));
    component.enviar();

    const req = httpMock.expectOne('http://localhost:3000/api/notificar');
    req.flush({ mensagemId: 'id-123', status: 'AGUARDANDO_PROCESSAMENTO' }, { status: 202, statusText: 'Accepted' });

    // Simula polling retornando sucesso
    fixture.detectChanges();
    expect(component.notificacoes[0].status).toBe('PROCESSADO_SUCESSO');
  });
});
