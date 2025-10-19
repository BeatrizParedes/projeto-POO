<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Livro } from '../../services/livro.service';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LivroService, Livro } from '../../services/livro.service';
>>>>>>> bf8ac294bfca73a7bc43940da51c501d42e98dca

@Component({
  selector: 'app-livro-detalhes',
  standalone: true,
  imports: [CommonModule],
<<<<<<< HEAD
  templateUrl: './livro-detalhes.component.html',
  styleUrls: ['./livro-detalhes.component.css']
})
export class LivroDetalhesComponent {
  @Input() livro!: Livro;
=======
  template: `
    <div *ngIf="carregando" class="loading">
      Carregando detalhes do livro...
    </div>

    <div *ngIf="!carregando && livro" class="detalhes">
      <h2>{{ livro.titulo }}</h2>
      <p><strong>Autor:</strong> {{ livro.autor }}</p>
      <p *ngIf="livro.genero"><strong>Gênero:</strong> {{ livro.genero }}</p>
      <p *ngIf="livro.descricao"><strong>Descrição:</strong> {{ livro.descricao }}</p>
      <p><strong>Preço:</strong> R$ {{ livro.preco | number:'1.2-2' }}</p>
    </div>

    <div *ngIf="!carregando && !livro">
      <p>Livro não encontrado.</p>
    </div>
  `,
  styles: [`
    .loading {
      font-size: 1.1rem;
      color: #555;
      text-align: center;
      margin-top: 20px;
    }

    .detalhes {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 20px auto;
    }

    .detalhes h2 {
      margin-bottom: 10px;
    }

    .detalhes p {
      margin: 6px 0;
    }
  `]
})
export class LivroDetalhesComponent implements OnInit {
  livro!: Livro;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private livroService: LivroService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.livroService.buscarPorId(id).subscribe({
        next: (dados: Livro) => {
          this.livro = dados;
          this.carregando = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao buscar livro:', err.message);
          this.carregando = false;
        }
      });
    } else {
      console.warn('ID inválido na rota.');
      this.carregando = false;
    }
  }
>>>>>>> bf8ac294bfca73a7bc43940da51c501d42e98dca
}
