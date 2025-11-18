import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaDesejosService, ListaDesejo } from '../../pages/lista-desejos/lista-desejos.service';

@Component({
  selector: 'app-card-livro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-livro.component.html',
  styleUrls: ['./card-livro.component.css']
})
export class CardLivroComponent implements OnInit {
  @Input() id!: number;
  @Input() titulo: string = '';
  @Input() preco: number = 0;
  @Input() acao: string = 'Ver detalhes';

  favorito: boolean = false;
  idListaDesejo?: number; 

  constructor(private listaDesejosService: ListaDesejosService) {}

  ngOnInit(): void {
    const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Beatriz Paredes';

    this.listaDesejosService.listar(nomeUsuario).subscribe({
      next: (lista: ListaDesejo[]) => {
        const item = lista.find(i => i.livro.id === this.id);
        if (item) {
          this.favorito = true;
          this.idListaDesejo = item.id;
        }
      },
      error: (err) => console.error('Erro ao carregar favoritos:', err)
    });
  }

  get precoFormatado(): string {
    return this.preco ? this.preco.toFixed(2).replace('.', ',') : '0,00';
  }

  get rotaDetalhes(): any[] {
    return ['/livro-detalhes', this.id];
  }

  toggleFavorito(): void {
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Beatriz Paredes';
  const estadoAnterior = this.favorito;

  
  this.favorito = !this.favorito;

  if (this.favorito) {
    
    this.listaDesejosService.adicionar(this.id, nomeUsuario).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Erro ao adicionar à lista de desejos:', err);
        
        this.favorito = estadoAnterior;
      }
    });
  } else {
    
    this.listaDesejosService.remover(this.id, nomeUsuario).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Erro ao remover da lista de desejos:', err);
        
        this.favorito = estadoAnterior;
      }
    });
  }
}

}
