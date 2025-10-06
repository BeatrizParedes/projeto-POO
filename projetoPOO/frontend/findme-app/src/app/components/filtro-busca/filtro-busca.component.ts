import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LivroService, Livro } from '../../services/livro.service';

@Component({
  selector: 'app-filtro-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-busca.component.html',
  styleUrls: ['./filtro-busca.component.css']
})
export class FiltroBuscaComponent {
  _titulo: string = '';
  _livros: Livro[] = [];
  _mensagem: string = '';

  constructor(private livroService: LivroService) {}

  buscar(): void {
    this._mensagem = '';
    this._livros = [];

    const termo = this._titulo.trim();

    if (termo === '') {
      this.livroService.listar().subscribe({
        next: (dados) => {
          this._livros = dados;
          if (dados.length === 0) {
            this._mensagem = 'Nenhum livro encontrado.';
          }
        },
        error: (err) => {
          console.error('Erro ao buscar livros:', err);
          this._mensagem = 'Erro ao carregar livros.';
        }
      });
    } else {
      this.livroService.buscarPorTitulo(termo).subscribe({
        next: (dados) => {
          this._livros = dados;
          if (dados.length === 0) {
            this._mensagem = 'Nenhum livro encontrado.';
          }
        },
        error: (err) => {
          console.error('Erro ao buscar livros por título:', err);
          this._mensagem = 'Erro ao buscar livros.';
        }
      });
    }
  }
}
