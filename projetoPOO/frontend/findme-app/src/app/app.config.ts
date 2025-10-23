import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideHttpClient() // ✅ Isso substitui o HttpClientModule
  ]
};
