import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivroService, Livro } from '../../services/livro.service';
import { CardLivroComponent } from '../card-livro/card-livro.component';

@Component({
  selector: 'app-sessao-livros',
  standalone: true,
  imports: [CommonModule, CardLivroComponent],
  templateUrl: './sessao-livros.component.html',
  styleUrls: ['./sessao-livros.component.css']
})
export class SessaoLivrosComponent implements OnInit {
  @Input() titulo: string = 'Novidades';
  @Input() livros: Livro[] = [];

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (dados) => {
        this.livros = dados;
      },
      error: (err) => {
        console.error('Erro ao listar livros:', err);
      }
    });


    this.livroService.livros$.subscribe({
      next: (dados) => {
        this.livros = dados;
      }
    });
  }
}
