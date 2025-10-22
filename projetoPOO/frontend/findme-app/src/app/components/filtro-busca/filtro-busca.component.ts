import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService, Livro } from '../../services/livro.service';

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

  constructor(
    private livroService: LivroService,
    private router: Router
  ) {}

  buscar(): void {
    const termoBusca = this.termo.trim();

    if (!termoBusca) {
      this.mensagem = 'Digite o título do livro para buscar.';
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    this.livroService.buscarPorTitulo(termoBusca).subscribe({
      next: (livros) => {
        this.carregando = false;

        if (livros.length > 0) {
          const livroEncontrado = livros[0];
          this.router.navigate(['/livros', livroEncontrado.id]); 
        } else {
          this.mensagem = 'Nenhum livro encontrado com esse título.';
        }
      },
      error: (erro) => {
        this.carregando = false;
        console.error('Erro ao buscar livro:', erro);
        this.mensagem = 'Ocorreu um erro na busca.';
      }
    });
  }
}
