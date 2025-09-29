import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.css'],
  standalone: true,          // importante para standalone component
  imports: [FormsModule]     // <- aqui você importa o FormsModule
})
export class CadastroLivroComponent {
  livro = {
    descricao: ''
  };
}
