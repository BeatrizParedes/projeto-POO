import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-busca.component.html',
  styleUrls: ['./filtro-busca.component.css']
})
export class FiltroBuscaComponent {
  termo: string = '';
  mensagem: string = '';
  carregando: boolean = false;

  constructor(private router: Router) {}

  buscar(): void {
    const termoBusca = this.termo.trim();

    if (!termoBusca) {
      this.mensagem = 'Digite o título do livro para buscar.';
      return;
    }

    
    this.router.navigate(['/resultado-busca'], {
      queryParams: { titulo: termoBusca }
    });
  }
}
