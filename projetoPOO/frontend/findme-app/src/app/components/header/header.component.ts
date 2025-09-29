import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true
})
export class HeaderComponent {
  constructor(private router: Router) {}

  abrirCadastro() {
    this.router.navigate(['/cadastro-livro']); // vai para a página correta
  }
}
