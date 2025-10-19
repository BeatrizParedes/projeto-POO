import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Livro } from '../../services/livro.service';

@Component({
  selector: 'app-livro-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livro-detalhes.component.html',
  styleUrls: ['./livro-detalhes.component.css']
})
export class LivroDetalhesComponent {
  @Input() livro!: Livro;
}
