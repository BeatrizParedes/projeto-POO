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

  /** 🔍 Lista todos os livros da lista de desejos do usuário */
  listar(nomeUsuario: string): Observable<ListaDesejo[]> {
    return this.http
      .get<ListaDesejo[]>(`${this.apiUrl}?nomeUsuario=${encodeURIComponent(nomeUsuario)}`)
      .pipe(
        tap(lista => {
          // Sempre atualiza o contador com base no backend
          this.countSubject.next(lista.length);
        })
      );
  }

  /** ❤️ Adiciona um livro à lista de desejos */
  adicionar(livroId: number, nomeUsuario: string): Observable<ListaDesejo> {
    // Atualiza visualmente o contador antes da resposta
    this.countSubject.next(this.countSubject.value + 1);

    const usuarioUrl = encodeURIComponent(nomeUsuario);
    return this.http
      .post<ListaDesejo>(
        `${this.apiUrl}/adicionar/${livroId}?nomeUsuario=${usuarioUrl}`,
        {}
      )
      .pipe(
        tap({
          next: () => this.atualizarContagem(nomeUsuario),
          error: () => {
            // Se falhar, reverte o contador
            this.countSubject.next(Math.max(0, this.countSubject.value - 1));
          }
        })
      );
  }

  /** ❌ Remove um item da lista de desejos */
  /** ❌ Remove um item da lista de desejos */
  remover(livroId: number, nomeUsuario?: string): Observable<void> {
    const usuario = nomeUsuario || localStorage.getItem('nomeUsuario') || 'Beatriz Paredes';
    const url = `${this.apiUrl}/remover/${livroId}?nomeUsuario=${encodeURIComponent(usuario)}`;

    // Atualiza o contador visualmente antes da resposta
    this.countSubject.next(Math.max(0, this.countSubject.value - 1));

    return this.http.delete<void>(url).pipe(
      tap({
        next: () => {
          // Depois de remover, força sincronização com o backend
          this.atualizarContagem(usuario);
        },
        error: () => {
          console.error('Erro ao remover item da lista.');
          // Se falhar, restaura o contador anterior
          this.atualizarContagem(usuario);
        }
      })
    );
  }


  /** 🔁 Atualiza a contagem total com base real no backend */
  atualizarContagem(nomeUsuario?: string): void {
    const usuario = nomeUsuario || localStorage.getItem('nomeUsuario') || 'Beatriz Paredes';

    // Pega o valor real no backend e atualiza o contador global
    this.listar(usuario).subscribe({
      next: (lista) => this.countSubject.next(lista.length),
      error: (err) => console.error('Falha ao atualizar contagem:', err),
    });
  }

  /** 🧹 Força a limpeza do contador (quando necessário) */
  resetarContagem(): void {
    this.countSubject.next(0);
  }
}
