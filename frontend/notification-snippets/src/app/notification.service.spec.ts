import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('envia POST e retorna 202', () => {
    service.enviar('oi').subscribe((res) => {
      expect(res.mensagemId).toBeTruthy();
      expect(res.status).toBeTruthy();
    });
    const req = httpMock.expectOne('http://localhost:3000/api/notificar');
    expect(req.request.method).toBe('POST');
    req.flush({ mensagemId: 'id-123', status: 'AGUARDANDO_PROCESSAMENTO' }, { status: 202, statusText: 'Accepted' });
  });
});
