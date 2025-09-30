import { Component } from '@angular/core';
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
export class HomeComponent {
  novidades = [
    { titulo: 'O Grande Gatsby', autor: 'F. Scott Fitzgerald', preco: 45.90 },
    { titulo: '1984', autor: 'George Orwell', preco: 38.50 }
  ];

  ultimasCompras = [
    { titulo: 'Dom Casmurro', autor: 'Machado de Assis', preco: 29.90 }
  ];

  sugestoes = [
    { titulo: 'A Revolução dos Bichos', autor: 'George Orwell', preco: 32.00 }
  ];
}
