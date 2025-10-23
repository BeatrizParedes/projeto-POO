import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  termo: string = '';
  mensagem: string = '';
  carregando: boolean = false;

  constructor(private router: Router) {}

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
}
