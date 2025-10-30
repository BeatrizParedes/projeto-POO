package com.example.demo.service;

import com.example.demo.model.Livro;
import com.example.demo.repository.LivroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


public class LivroServiceTest {

    private LivroRepository livroRepository;
    private LivroService livroService;

    @BeforeEach
    void setup() {
        livroRepository = mock(LivroRepository.class);
        livroService = new LivroService(livroRepository);
    }

    @Test
    void deveListarTodosOsLivros() {
        Livro l1 = new Livro(); l1.setTitulo("Clean Code");
        Livro l2 = new Livro(); l2.setTitulo("Refactoring");
        when(livroRepository.findAll()).thenReturn(Arrays.asList(l1, l2));

        List<Livro> resultado = livroService.listartodos();

        assertEquals(2, resultado.size());
        verify(livroRepository).findAll();
    }

    @Test
    void deveBuscarPorIdQuandoExiste() {
        Livro livro = new Livro(); livro.setId(1L); livro.setTitulo("Domain-Driven Design");
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));

        Optional<Livro> encontrado = livroService.buscaporID(1L);

        assertTrue(encontrado.isPresent());
        assertEquals("Domain-Driven Design", encontrado.get().getTitulo());
        verify(livroRepository).findById(1L);
    }

    @Test
    void deveSalvarLivro() {
        Livro novo = new Livro(); novo.setTitulo("Clean Architecture");
        when(livroRepository.save(any(Livro.class))).thenAnswer(i -> {
            Livro l = i.getArgument(0);
            l.setId(99L);
            return l;
        });

        Livro salvo = livroService.salvar(novo);

        assertNotNull(salvo.getId());
        assertEquals("Clean Architecture", salvo.getTitulo());
        verify(livroRepository).save(any(Livro.class));
    }

    @Test
    void deveDeletarPorId() {
        doNothing().when(livroRepository).deleteById(5L);

        livroService.deletarporID(5L);

        verify(livroRepository).deleteById(5L);
    }

    @Test
    void deveBuscarComFiltros() {
        Livro l = new Livro(); l.setTitulo("Harry Potter");
        when(livroRepository.filtrarLivros("Harry", "Fantasia", 100.0))
                .thenReturn(List.of(l));

        List<Livro> resultado = livroService.buscarComFiltros("Harry", "Fantasia", 100.0);

        assertEquals(1, resultado.size());
        assertEquals("Harry Potter", resultado.get(0).getTitulo());
        verify(livroRepository).filtrarLivros("Harry", "Fantasia", 100.0);
    }
}
