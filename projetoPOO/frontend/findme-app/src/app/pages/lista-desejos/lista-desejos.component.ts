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

  // 🔹 Mesma lógica de fallback usada no restante do app
  private getNomeUsuarioPadrao(): string {
    return (localStorage.getItem('nomeUsuario') || 'Beatriz Paredes').trim();
  }

  ngOnInit(): void {
    // 1) Tenta pegar da URL (?usuario=...)
    const queryUser = (this.route.snapshot.queryParamMap.get('usuario') || '').trim();

    if (queryUser) {
      this.nomeUsuarioCtrl.setValue(queryUser);
      localStorage.setItem('nomeUsuario', queryUser); // garante que fique salvo
      this.carregar(false);
      return;
    }

    // 2) Se não tiver na URL, usa localStorage OU fallback padrão
    const stored = this.getNomeUsuarioPadrao();
    if (stored) {
      this.nomeUsuarioCtrl.setValue(stored);
      localStorage.setItem('nomeUsuario', stored);
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

    // Sempre sincroniza com localStorage
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
          this.titulo(a.livro).localeCompare(this.titulo(b.livro), 'pt-BR', {
            sensitivity: 'base',
          })
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
    // ⚠️ Agora removemos PELO ID DO LIVRO, porque o service chama /remover-por-livro/{livroId}
    const livroId = this.idLivro(item.livro);
    if (!livroId) return;

    if (!confirm(`Remover "${this.titulo(item.livro)}" da sua lista?`)) return;

    this.removendo.set(livroId, true);

    const nomeUsuario =
      this.nomeUsuarioCtrl.value || this.getNomeUsuarioPadrao();

    this.svc.remover(livroId, nomeUsuario).subscribe({
      next: () => {
        // Como o backend remove por livro, filtramos por livro também
        this.itens = this.itens.filter((i) => this.idLivro(i.livro) !== livroId);
      },
      error: (err) => {
        console.error(err);
        alert('Falha ao remover. Tente novamente.');
      },
      complete: () => this.removendo.delete(livroId),
    });
  }

  verDetalhes(idLivro?: number): void {
    if (!idLivro) return;
    this.router.navigate(['/livro-detalhes', idLivro]);
  }

  limparUsuario(): void {
    this.nomeUsuarioCtrl.setValue('');
    this.router.navigate([], {
      queryParams: { usuario: null },
      queryParamsHandling: 'merge',
    });
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
