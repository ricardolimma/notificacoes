
import { TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';


describe('NotificationComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [NotificationComponent]
  }));

  it('should create the notification component', () => {
    const fixture = TestBed.createComponent(NotificationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
