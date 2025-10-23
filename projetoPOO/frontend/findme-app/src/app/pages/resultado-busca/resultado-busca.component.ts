import { Component, OnInit } from '@angular/core';
import { LivroService, Livro } from '../../services/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  termo: string = '';
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { livros?: Livro[] };

    if (state && state.livros && state.livros.length > 0) {
      this.livros = state.livros;
      return; 
    }

    
    this.route.queryParams.subscribe(params => {
      this.termo = params['titulo'] || '';
      if (this.termo) {
        this.buscarLivros(this.termo);
      } else {
        this.livros = [];
      }
    });
  }

  buscarLivros(titulo: string): void {
    this.carregando = true;
    this.erro = '';

    this.livroService.buscarPorTitulo(titulo).subscribe({
      next: (res: Livro[] | Livro) => {
        this.livros = Array.isArray(res) ? res : (res ? [res] : []);
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar livros:', err);
        this.erro = 'Erro ao buscar livros.';
        this.carregando = false;
      }
    });
  }

  verDetalhes(id: number | undefined): void {
    if (id != null) {
      this.router.navigate(['/livro-detalhes', id]);
    }
  }
}
