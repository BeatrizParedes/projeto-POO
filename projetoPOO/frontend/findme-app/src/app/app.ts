import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BannerPromocaoComponent } from './components/banner-promocao/banner-promocao.component';
import { FiltroBuscaComponent } from './components/filtro-busca/filtro-busca.component';
import { SessaoLivrosComponent } from './components/sessao-livros/sessao-livros.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerPromocaoComponent,
    FiltroBuscaComponent,
    SessaoLivrosComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  novidades = [
    { titulo: 'Flores para Algernon', preco: 'R$ 48,50', imagem: 'assets/algernon.jpg', acao: 'Comprar' },
    { titulo: 'Drácula', preco: 'R$ 48,50', imagem: 'assets/dracula.jpg', acao: 'Comprar' }
  ];

  ultimasCompras = [
    { titulo: 'É Assim Que Acaba', preco: 'R$ 32,55', imagem: 'assets/eassim.jpg', acao: 'Detalhes' }
  ];

  sugestoes = [
    { titulo: 'Vermelho, branco e sangue azul', preco: 'R$ 32,55', imagem: 'assets/vermelho.jpg', acao: 'Detalhes' }
  ];
}
