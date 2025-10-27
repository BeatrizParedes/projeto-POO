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
  termo = '';            
  genero = '';           
  precoMax?: number;    
  mensagem = '';

  generos = ['Fantasia', 'Romance', 'Terror', 'Educacional', 'Outros'];

  constructor(private router: Router) {}

  buscar(): void {
    const params: any = {};
    const t = this.termo.trim();
    const g = this.genero.trim();
    const p = this.precoMax;

    if (t) params.titulo = t;
    if (g) params.genero = g;
    if (p != null && !Number.isNaN(p) && p >= 0) params.preco = p;

    if (!t && !g && (p == null || Number.isNaN(p))) {
      this.mensagem = 'Digite um título, selecione gênero e/oupreço máximo.';
      return;
    }

    this.router.navigate(['/resultado-busca'], { queryParams: params });
  }
}
