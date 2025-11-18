import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Livro {
  id: number;
  titulo: string;
  autor?: string;
  preco?: number;
  imagemUrl?: string;
  genero?: string;
  descricao?: string;
}

export interface ListaDesejo {
  id?: number;
  livro: Livro;
  nomeUsuario: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListaDesejosService {
  
  private apiUrl = 'http://localhost:8080/api/lista-desejos';

  
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  constructor(private http: HttpClient) {}

  
  listar(nomeUsuario: string): Observable<ListaDesejo[]> {
    const usuarioUrl = encodeURIComponent(nomeUsuario);

    return this.http
      .get<ListaDesejo[]>(`${this.apiUrl}?nomeUsuario=${usuarioUrl}`)
      .pipe(
        tap(lista => {
          
          this.countSubject.next(lista.length);
        })
      );
  }

  
  adicionar(livroId: number, nomeUsuario: string): Observable<ListaDesejo> {
    const usuarioUrl = encodeURIComponent(nomeUsuario);

    
    this.countSubject.next(this.countSubject.value + 1);

    return this.http
      .post<ListaDesejo>(
        `${this.apiUrl}/adicionar/${livroId}?nomeUsuario=${usuarioUrl}`,
        {}
      )
      .pipe(
        tap({
          next: () => this.atualizarContagem(nomeUsuario),
          error: () => {
            
            this.countSubject.next(Math.max(0, this.countSubject.value - 1));
          }
        })
      );
  }

  
  remover(livroId: number, nomeUsuario?: string): Observable<void> {
    const usuario = nomeUsuario || localStorage.getItem('nomeUsuario') || 'Beatriz Paredes';
    const usuarioUrl = encodeURIComponent(usuario);

    
    const url = `${this.apiUrl}/remover-por-livro/${livroId}?nomeUsuario=${usuarioUrl}`;

    
    this.countSubject.next(Math.max(0, this.countSubject.value - 1));

    return this.http.delete<void>(url).pipe(
      tap({
        next: () => {
          
          this.atualizarContagem(usuario);
        },
        error: () => {
          console.error('Erro ao remover item da lista.');
          this.atualizarContagem(usuario); 
        }
      })
    );
  }

  
  atualizarContagem(nomeUsuario?: string): void {
    const usuario = nomeUsuario || localStorage.getItem('nomeUsuario') || 'Beatriz Paredes';

    this.listar(usuario).subscribe({
      next: (lista) => this.countSubject.next(lista.length),
      error: (err) => console.error('Falha ao atualizar contagem:', err),
    });
  }

  
  resetarContagem(): void {
    this.countSubject.next(0);
  }
}
