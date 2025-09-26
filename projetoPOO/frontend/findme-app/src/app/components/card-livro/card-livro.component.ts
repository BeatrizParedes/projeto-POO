import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-livro',
  standalone: true,
  templateUrl: './card-livro.component.html',
  styleUrls: ['./card-livro.component.css']
})
export class CardLivroComponent {
  @Input() titulo: string = '';
  @Input() preco: string = '';
  @Input() imagem: string = '';
  @Input() acao: string = '';
}
