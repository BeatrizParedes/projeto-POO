import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; 
import { AppComponent } from './app/app.component'; // Aponta para a subpasta 'app'
import { routes } from './app/app.routes'; // Aponta para a subpasta 'app'

bootstrapApplication(AppComponent, {
  providers: [
    // ESSENCIAL: Prover o serviço de roteamento com as rotas definidas em app.routes.ts
    provideRouter(routes) 
  ]
}).catch(err => console.error(err));
