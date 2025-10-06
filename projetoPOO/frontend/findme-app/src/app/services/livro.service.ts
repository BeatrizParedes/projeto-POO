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
  private baseUrl = 'http://localhost:8080/api/livros'; // backend Spring Boot

  constructor(private http: HttpClient) {}

  // Lista todos os livros
  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseUrl);
  }

  // Busca livro por ID
  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/${id}`);
  }

  // Busca livros filtrando por título (usa o endpoint /buscar do backend)
  buscarPorTitulo(titulo: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.baseUrl}/buscar?titulo=${titulo}`);
  }

  // Salva um novo livro
  salvar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.baseUrl, livro);
  }

  // Deleta um livro pelo ID
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
