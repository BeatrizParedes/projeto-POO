import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';
import { NaoEncontradoComponent } from './pages/nao-encontrado/nao-encontrado.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Findme | Página Inicial'
  },
  {
    path: 'cadastro-livro',
    component: CadastroLivroComponent,
    title: 'Findme | Cadastro de Livros'
  },
  {
    path: 'livros/:id',
    loadComponent: () =>
      import('./pages/livro-detalhes/livro-detalhes.component')
        .then(m => m.LivroDetalhesComponent),
    title: 'Findme | Detalhes do Livro'
  },
  {
    path: '**',
    component: NaoEncontradoComponent,
    title: 'Findme | Página Não Encontrada'
  }
];
