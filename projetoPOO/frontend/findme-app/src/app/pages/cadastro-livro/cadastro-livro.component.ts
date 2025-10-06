import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LivroService, Livro } from '../../services/livro.service';


@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.css'],
  standalone: true,
  imports: [FormsModule]     // <- aqui você importa o FormsModule
})
export class CadastroLivroComponent {
  livro: Livro = { titulo: '', autor: '', preco: 0, descricao: '', genero: '' };

  constructor(private livrosApi: LivroService) {}

  onSubmit() {
    this.livrosApi.salvar(this.livro).subscribe(() => {
      alert('Livro salvo com sucesso!');
      this.livro = { titulo: '', autor: '', preco: 0, descricao: '', genero: '' };
    });
  }
}
