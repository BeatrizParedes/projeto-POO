import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Livro {
  id?: number;
  titulo: string;
  autor?: string;      
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

  buscar(params: { titulo?: string; genero?: string; preco?: number }): Observable<Livro[]> {
    const cleaned: Record<string, any> = {};
    if (params.titulo?.trim()) cleaned['titulo'] = params.titulo.trim();
    if (params.genero?.trim()) cleaned['genero'] = params.genero.trim();
    if (params.preco != null)  cleaned['preco']  = params.preco;

    const httpParams = new HttpParams({ fromObject: cleaned });

    return this.http.get<Livro[]>(`${this.baseUrl}/buscar`, { params: httpParams }).pipe(
      tap(lista => this.livrosSubject.next(lista))
    );
  }

  buscarPorTitulo(titulo: string)               { return this.buscar({ titulo }); }
  buscarPorGenero(genero: string)               { return this.buscar({ genero }); }
  buscarPorTituloEGenero(t: string, g: string)  { return this.buscar({ titulo: t, genero: g }); }
  buscarAtePreco(preco: number)                 { return this.buscar({ preco }); }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const atual = this.livrosSubject.value;
        this.livrosSubject.next(atual.filter(l => l.id !== id));
      })
    );
  }
}
