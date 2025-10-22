import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService, Livro } from '../../services/livro.service';

@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.css']
})
export class CadastroLivroComponent {
  livro: Livro = {
    titulo: '',
    autor: '',
    genero: '',
    descricao: '',
    preco: 0
  };

  mensagemSucesso: string = '';
  cadastroConcluido: boolean = false; 

  constructor(
    private livroService: LivroService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.livro.titulo || !this.livro.autor || !this.livro.genero || !this.livro.descricao) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    this.livroService.salvar(this.livro).subscribe({
      next: () => {
        this.mensagemSucesso = 'Livro cadastrado com sucesso!';
        this.cadastroConcluido = true;

        
        this.livro = {
          titulo: '',
          autor: '',
          genero: '',
          descricao: '',
          preco: 0
        };
      },
      error: (erro) => {
        console.error('Erro ao salvar livro:', erro);
        alert('Ocorreu um erro ao salvar o livro.');
      }
    });
  }

  voltarHome(): void {
    this.router.navigate(['/']); 
  }
}
