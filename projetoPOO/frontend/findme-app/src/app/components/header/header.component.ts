import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListaDesejosService } from '../../pages/lista-desejos/lista-desejos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  termo: string = '';
  mensagem: string = '';
  carregando: boolean = false;
  countDesejos: number = 0;
  private sub!: Subscription;

  constructor(
    private router: Router,
    private listaDesejosService: ListaDesejosService
  ) {}

  ngOnInit(): void {
    const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Beatriz Paredes';

    
    this.sub = this.listaDesejosService.count$.subscribe(count => {
      this.countDesejos = count;
    });

    
    this.listaDesejosService.atualizarContagem(nomeUsuario);
  }

  ngOnDestroy(): void {
    
    if (this.sub) this.sub.unsubscribe();
  }

  abrirCadastro() {
    this.router.navigate(['/cadastro-livro']);
  }

  buscar(): void {
    const termoBusca = this.termo.trim();
    if (!termoBusca) {
      this.mensagem = 'Digite o título do livro para buscar.';
      return;
    }
    this.router.navigate(['/resultado-busca'], {
      queryParams: { titulo: termoBusca }
    });
  }

  abrirListaDesejos() {
    this.router.navigate(['/lista-desejos']);
  }
}
