import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-livro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-livro.component.html',
  styleUrls: ['./card-livro.component.css']
})
export class CardLivroComponent {
  @Input() id!: number;
  @Input() titulo: string = '';
  @Input() preco: number = 0;
  @Input() acao: string = 'Ver detalhes';

  get precoFormatado(): string {
    return this.preco ? this.preco.toFixed(2).replace('.', ',') : '0,00';
  }

  get rotaDetalhes(): any[] {
    return ['/livro-detalhes', this.id];
  }
}
