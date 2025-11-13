import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ListaDesejosService, ListaDesejo } from '../lista-desejos/lista-desejos.service';

@Component({
  selector: 'app-lista-desejos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './lista-desejos.component.html',
  styleUrls: ['./lista-desejos.component.css'],
})
export class ListaDesejosComponent implements OnInit {
  loading = false;
  errorMsg: string | null = null;
  itens: ListaDesejo[] = [];
  nomeUsuarioCtrl = new FormControl<string>('', { nonNullable: true } as any);
  private removendo = new Map<number, boolean>();

  constructor(
    private readonly svc: ListaDesejosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const queryUser = (this.route.snapshot.queryParamMap.get('usuario') || '').trim();

    if (queryUser) {
      this.nomeUsuarioCtrl.setValue(queryUser);
      this.carregar();
      return;
    }

    const stored = (localStorage.getItem('nomeUsuario') || '').trim();
    if (stored) {
      this.nomeUsuarioCtrl.setValue(stored);
      this.carregar(false);
    }
  }

  get total(): number {
    return this.itens.length;
  }

  isRemovendo(id?: number): boolean {
    return !!(id && this.removendo.get(id) === true);
  }

  carregar(updateUrl: boolean = true): void {
    const nomeUsuario = (this.nomeUsuarioCtrl.value || '').trim();
    if (!nomeUsuario) {
      this.errorMsg = 'Informe o nome do usuário.';
      this.itens = [];
      return;
    }

    localStorage.setItem('nomeUsuario', nomeUsuario);

    if (updateUrl) {
      this.router.navigate([], {
        queryParams: { usuario: nomeUsuario },
        queryParamsHandling: 'merge',
      });
    }

    this.loading = true;
    this.errorMsg = null;

    this.svc.listar(nomeUsuario).subscribe({
      next: (res) => {
        const ordenados = [...res].sort((a, b) =>
          this.titulo(a.livro).localeCompare(this.titulo(b.livro), 'pt-BR', { sensitivity: 'base' })
        );
        this.itens = ordenados;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Não foi possível carregar sua lista. Tente novamente.';
        this.itens = [];
      },
      complete: () => (this.loading = false),
    });
  }

  remover(item: ListaDesejo): void {
    if (!item.id) return;
    if (!confirm(`Remover "${this.titulo(item.livro)}" da sua lista?`)) return;

    this.removendo.set(item.id, true);

    const nomeUsuario = this.nomeUsuarioCtrl.value || localStorage.getItem('nomeUsuario') || '';

    this.svc.remover(item.id, nomeUsuario).subscribe({
      next: () => (this.itens = this.itens.filter((i) => i.id !== item.id)),
      error: (err) => {
        console.error(err);
        alert('Falha ao remover. Tente novamente.');
      },
      complete: () => this.removendo.delete(item.id!),
    });
  }

  verDetalhes(idLivro?: number): void {
    if (!idLivro) return;
    this.router.navigate(['/livro-detalhes', idLivro]);
  }

  limparUsuario(): void {
    this.nomeUsuarioCtrl.setValue('');
    this.router.navigate([], { queryParams: { usuario: null }, queryParamsHandling: 'merge' });
    this.itens = [];
    this.errorMsg = null;
  }

  trackById(index: number, item: ListaDesejo) {
    return item.id ?? this.idLivro(item.livro) ?? index;
  }

  capa(l: any): string {
    return (
      l?.imagemUrl ||
      l?.capaUrl ||
      l?.capa ||
      l?.image ||
      l?.urlImagem ||
      l?.thumbnail ||
      'assets/placeholder-capa.png'
    );
  }

  titulo(l: any): string {
    return l?.titulo ?? l?.title ?? l?.nome ?? '';
  }

  autor(l: any): string | undefined {
    return l?.autor ?? l?.author ?? l?.escritor;
  }

  avaliacao(l: any): number | undefined {
    const v = l?.avaliacao ?? l?.rating ?? l?.nota;
    return typeof v === 'number' ? v : undefined;
  }

  idLivro(l: any): number | undefined {
    const v = l?.id ?? l?.livroId ?? l?.codigo;
    return typeof v === 'number' ? v : undefined;
  }
}
