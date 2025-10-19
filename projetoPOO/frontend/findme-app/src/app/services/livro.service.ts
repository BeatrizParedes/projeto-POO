import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  genero?: string;
  descricao?: string;
  preco: number;
}

@Injectable({ providedIn: 'root' })
export class LivroService {
  private baseUrl = 'http://localhost:8080/api/livros';

  constructor(private http: HttpClient) {}

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/${id}`);
  }

  buscarPorTitulo(titulo: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.baseUrl}/buscar?titulo=${titulo}`);
  }

  salvar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.baseUrl, livro);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
