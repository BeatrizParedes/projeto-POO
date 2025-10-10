import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './livro.service';

export interface ListaDesejo {
  id?: number;
  livro: Livro;
  nomeUsuario: string;
}

@Injectable({ providedIn: 'root' })
export class ListaDesejosService {
  private baseUrl = 'http://localhost:8080/api/lista-desejos';

  constructor(private http: HttpClient) {}

  adicionar(livroId: number, nomeUsuario: string): Observable<ListaDesejo> {
    return this.http.post<ListaDesejo>(
      `${this.baseUrl}/adicionar/${livroId}?nomeUsuario=${nomeUsuario}`,
      {}
    );
  }

  listar(nomeUsuario: string): Observable<ListaDesejo[]> {
    return this.http.get<ListaDesejo[]>(`${this.baseUrl}?nomeUsuario=${nomeUsuario}`);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
