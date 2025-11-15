package com.example.demo.service;

import com.example.demo.model.ListaDesejo;
import com.example.demo.model.Livro;
import com.example.demo.repository.ListaDesejosRepository;
import com.example.demo.repository.LivroRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ListaDesejosServiceTest {

    @Mock
    private ListaDesejosRepository listaDesejosRepository;

    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private ListaDesejosService listaDesejosService;

    @Test
    void deveAdicionarLivroNaListaDeDesejos() {
        // Arrange
        Long livroId = 1L;
        String usuario = "cecilia";

        Livro livro = new Livro();
        livro.setId(livroId);
        livro.setTitulo("Clean Code");

        ListaDesejo itemSalvo = new ListaDesejo(livro, usuario);

        when(livroRepository.findById(livroId)).thenReturn(Optional.of(livro));
        when(listaDesejosRepository.save(any(ListaDesejo.class))).thenReturn(itemSalvo);

        // Act
        ListaDesejo resultado = listaDesejosService.adicionar(livroId, usuario);

        // Assert
        assertNotNull(resultado);
        assertEquals("Clean Code", resultado.getLivro().getTitulo());
        assertEquals("cecilia", resultado.getNomeUsuario());

        verify(livroRepository).findById(livroId);
        verify(listaDesejosRepository).save(any(ListaDesejo.class));
    }

    @Test
    void deveLancarExcecaoQuandoLivroNaoExisteAoAdicionar() {
        Long livroId = 99L;
        String usuario = "cecilia";

        when(livroRepository.findById(livroId)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> listaDesejosService.adicionar(livroId, usuario));

        assertEquals("Livro não encontrado", ex.getMessage());
        verify(livroRepository).findById(livroId);
        verify(listaDesejosRepository, never()).save(any());
    }

    @Test
    void deveListarItensDaListaDeDesejosDoUsuario() {
        String usuario = "cecilia";

        Livro livro = new Livro();
        livro.setId(1L);
        livro.setTitulo("Refactoring");

        ListaDesejo item = new ListaDesejo(livro, usuario);

        when(listaDesejosRepository.findByNomeUsuario(usuario))
                .thenReturn(List.of(item));

        List<ListaDesejo> resultado = listaDesejosService.listar(usuario);

        assertEquals(1, resultado.size());
        assertEquals("Refactoring", resultado.get(0).getLivro().getTitulo());
        assertEquals("cecilia", resultado.get(0).getNomeUsuario());

        verify(listaDesejosRepository).findByNomeUsuario(usuario);
    }

    @Test
    void deveRemoverItemDaListaPorId() {
        Long id = 7L;
        String usuario = "cecilia";

        listaDesejosService.remover(id, usuario);

        verify(listaDesejosRepository).deleteById(id);
    }

    @Test
    void deveRemoverItemDaListaPorLivroId() {
        Long livroId = 3L;
        String usuario = "cecilia";

        listaDesejosService.removerPorLivro(livroId, usuario);

        verify(listaDesejosRepository).deleteByNomeUsuarioAndLivro_Id(usuario, livroId);
    }
}
