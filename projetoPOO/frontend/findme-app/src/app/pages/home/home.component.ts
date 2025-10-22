import { Component, OnInit } from '@angular/core';
import { LivroService, Livro } from '../../services/livro.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BannerPromocaoComponent } from '../../components/banner-promocao/banner-promocao.component';
import { FiltroBuscaComponent } from '../../components/filtro-busca/filtro-busca.component';
import { SessaoLivrosComponent } from '../../components/sessao-livros/sessao-livros.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent,
    BannerPromocaoComponent,
    FiltroBuscaComponent,
    SessaoLivrosComponent
  ]
})
export class HomeComponent implements OnInit {

  novidades: Livro[] = [];
  ultimasCompras: Livro[] = [];
  sugestoes: Livro[] = [];

  constructor(private livrosApi: LivroService) {}

  ngOnInit(): void {
    
    this.livrosApi.livros$.subscribe(lista => {
      this.novidades = lista.slice(0, 6);
      this.ultimasCompras = lista.slice(6, 12);
      this.sugestoes = lista.slice(12, 18);
    });

    
    const listaAtual = this.livrosApi['livrosSubject'].value;
    if (listaAtual.length === 0) {
      this.livrosApi.listar().subscribe();
    }
  }
}
