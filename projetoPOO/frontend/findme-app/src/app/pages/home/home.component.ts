import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';              
import { LivroService, Livro } from '../../services/livro.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { BannerPromocaoComponent } from '../../components/banner-promocao/banner-promocao.component';
import { SessaoLivrosComponent } from '../../components/sessao-livros/sessao-livros.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    FormsModule,              
    FooterComponent,
    BannerPromocaoComponent,
    SessaoLivrosComponent
  ]
})
export class HomeComponent implements OnInit {

  
  novidades: Livro[] = [];

  filtroGenero: string = '';
  filtroPrecoMax?: number;
  carregandoNovidades = false;
  erroNovidades = '';

  generos = ['Fantasia', 'Romance', 'Terror', 'Educacional', 'Outros'];

  constructor(private livrosApi: LivroService) {}

  ngOnInit(): void {
    
    this.livrosApi.livros$.subscribe(lista => {
      this.novidades = lista;
    });

    this.livrosApi.listar().subscribe();  
  }

  aplicarFiltrosNovidades(): void {
    this.carregandoNovidades = true;
    this.erroNovidades = '';

    const genero = this.filtroGenero?.trim() || undefined;
    const preco  = this.filtroPrecoMax != null && !Number.isNaN(this.filtroPrecoMax)
      ? Number(this.filtroPrecoMax)
      : undefined;

    this.livrosApi.buscar({ genero, preco }).subscribe({
      next: lista => {
        this.novidades = lista; 
        this.carregandoNovidades = false;
      },
      error: err => {
        console.error(err);
        this.erroNovidades = 'Não foi possível aplicar o filtro.';
        this.carregandoNovidades = false;
      }
    });
  }

  limparFiltrosNovidades(): void {
    this.filtroGenero = '';
    this.filtroPrecoMax = undefined;
    this.carregandoNovidades = true;
    this.erroNovidades = '';

    this.livrosApi.listar().subscribe({
      next: lista => {
        this.novidades = lista;
        this.carregandoNovidades = false;
      },
      error: () => {
        this.erroNovidades = 'Falha ao recarregar lista.';
        this.carregandoNovidades = false;
      }
    });
  }
}
