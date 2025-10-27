import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService, Livro } from '../../services/livro.service';
import { CardLivroComponent } from '../../components/card-livro/card-livro.component';

@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [CommonModule, CardLivroComponent], 
  templateUrl: './resultado-busca.component.html',
  styleUrls: ['./resultado-busca.component.css']
})
export class ResultadoBuscaComponent implements OnInit {
  livros: Livro[] = [];
  carregando = false;
  erro = '';
  titulo?: string;
  genero?: string;
  preco?: number;

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state as { livros?: Livro[] } | undefined;
    if (state?.livros?.length) {
      this.livros = state.livros;
      return;
    }

    this.route.queryParams.subscribe(params => {
      this.titulo = params['titulo'] || undefined;
      this.genero = params['genero'] || undefined;
      this.preco  = params['preco']  ? Number(params['preco']) : undefined;

      if (!this.titulo && !this.genero && this.preco == null) {
        this.livros = [];
        return;
      }

      this.carregando = true;
      this.livroService.buscar({ titulo: this.titulo, genero: this.genero, preco: this.preco })
        .subscribe({
          next: lista => { this.livros = lista; this.carregando = false; },
          error: err => { console.error(err); this.erro = 'Erro ao buscar livros.'; this.carregando = false; }
        });
    });
  }

  get labelBusca(): string {
    const parts: string[] = [];
    if (this.titulo) parts.push(`título "${this.titulo}"`);
    if (this.genero) parts.push(`gênero "${this.genero}"`);
    if (this.preco != null) parts.push(`preço até R$ ${this.preco}`);
    return parts.join(' • ');
  }

  verDetalhes(id?: number) {
    if (id != null) this.router.navigate(['/livro-detalhes', id]);
  }
}
