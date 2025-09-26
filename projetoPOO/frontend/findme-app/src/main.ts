import { AppComponent } from './app/app';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
