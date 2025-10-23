import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../services/livro.service';

@Component({
  selector: 'app-livro-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livro-detalhes.component.html',
  styleUrls: ['./livro-detalhes.component.css']
})
export class LivroDetalhesComponent implements OnInit {
  livro!: Livro;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,             
    private livroService: LivroService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.livroService.buscarPorId(id).subscribe({
        next: (dados: Livro) => {
          this.livro = dados;
          this.carregando = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao buscar livro:', err.message);
          this.carregando = false;
        }
      });
    } else {
      console.warn('ID inválido na rota.');
      this.carregando = false;
    }
  }

  
  voltarHome(): void {
    this.router.navigate(['/']);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}
