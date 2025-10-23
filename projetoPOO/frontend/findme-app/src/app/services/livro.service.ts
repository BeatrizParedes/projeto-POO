import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  genero?: string;
  descricao?: string;
  preco: number;
  avaliacao?: number;
}

@Injectable({ providedIn: 'root' })
export class LivroService {
  private baseUrl = 'http://localhost:8080/api/livros';

  private livrosSubject = new BehaviorSubject<Livro[]>([]);
  livros$ = this.livrosSubject.asObservable();

  constructor(private http: HttpClient) {}

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseUrl).pipe(
      tap(lista => this.livrosSubject.next(lista))
    );
  }

  salvar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.baseUrl, livro).pipe(
      tap(novoLivro => {
        const atual = this.livrosSubject.value;
        this.livrosSubject.next([...atual, novoLivro]);
      })
    );
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/${id}`);
  }

  buscarPorTitulo(titulo: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/buscar?titulo=${encodeURIComponent(titulo)}`;
    return this.http.get<Livro[]>(url);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const atual = this.livrosSubject.value;
        this.livrosSubject.next(atual.filter(l => l.id !== id));
      })
    );
  }
}
