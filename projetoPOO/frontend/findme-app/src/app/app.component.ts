import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Geralmente bom incluir

@Component({
  selector: 'app-root',
  standalone: true,
  // O RouterOutlet é o componente que renderiza o conteúdo da rota atual (Home, Cadastro, 404).
  imports: [CommonModule, RouterOutlet],
  template: `
    <!-- 
      O <router-outlet> carrega o componente correspondente à URL atual.
      Ex: Se a URL for "/", ele carrega o HomeComponent.
    -->
    <router-outlet></router-outlet>
  `,
  // Se você tiver estilos globais para o container principal, coloque-os aqui.
  styles: [`
    /* Adicione estilos de container globais aqui se necessário */
  `]
})
export class AppComponent { 
  // O AppComponent fica vazio, pois sua função é estrutural, não lógica.
}
