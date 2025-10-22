import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  termo: string = '';
  mensagem: string = '';
  carregando: boolean = false;

  constructor(
    private router: Router,
    private livroService: LivroService
  ) {}

  abrirCadastro() {
    this.router.navigate(['/cadastro-livro']);
  }

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
