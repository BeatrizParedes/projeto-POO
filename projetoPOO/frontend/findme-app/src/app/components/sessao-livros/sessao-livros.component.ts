import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLivroComponent } from '../card-livro/card-livro.component';
import { Livro } from '../../services/livro.service';

@Component({
  selector: 'app-sessao-livros',
  standalone: true,
  imports: [CommonModule, CardLivroComponent],
  templateUrl: './sessao-livros.component.html',
  styleUrls: ['./sessao-livros.component.css']
})
export class SessaoLivrosComponent {
  @Input() titulo: string = '';
  @Input() livros: Livro[] = [];
}
