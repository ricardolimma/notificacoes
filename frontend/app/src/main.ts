import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { NotificationComponent } from './app/notification.component';

bootstrapApplication(NotificationComponent, appConfig)
  .catch((err) => console.error(err));
