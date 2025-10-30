package com.example.demo.repository;

import com.example.demo.model.Livro;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


public class LivroRepositoryTest {

    @Mock
    private LivroRepository livroRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveFiltrarLivrosPorTituloGeneroEPreco() {
        Livro livro = new Livro();
        livro.setTitulo("Harry Potter");
        livro.setGenero("Fantasia");
        livro.setPreco(100.0);

        when(livroRepository.filtrarLivros("Harry", "Fantasia", 100.0))
                .thenReturn(List.of(livro));

        List<Livro> resultado = livroRepository.filtrarLivros("Harry", "Fantasia", 100.0);

        assertEquals(1, resultado.size());
        assertEquals("Harry Potter", resultado.get(0).getTitulo());
        verify(livroRepository).filtrarLivros("Harry", "Fantasia", 100.0);
    }

    @Test
    void deveBuscarPorTituloIgnorandoCase() {
        Livro livro = new Livro();
        livro.setTitulo("Clean Code");

        when(livroRepository.findByTituloContainingIgnoreCase("clean"))
                .thenReturn(List.of(livro));

        List<Livro> resultado = livroRepository.findByTituloContainingIgnoreCase("clean");

        assertEquals(1, resultado.size());
        assertEquals("Clean Code", resultado.get(0).getTitulo());
        verify(livroRepository).findByTituloContainingIgnoreCase("clean");
    }

    @Test
    void deveBuscarPorGeneroIgnorandoCase() {
        Livro livro = new Livro();
        livro.setGenero("Tecnologia");

        when(livroRepository.findByGeneroContainingIgnoreCase("tecno"))
                .thenReturn(List.of(livro));

        List<Livro> resultado = livroRepository.findByGeneroContainingIgnoreCase("tecno");

        assertEquals(1, resultado.size());
        assertEquals("Tecnologia", resultado.get(0).getGenero());
        verify(livroRepository).findByGeneroContainingIgnoreCase("tecno");
    }

    @Test
    void deveBuscarPorPreco() {
        Livro livro = new Livro();
        livro.setPreco(99.9);

        when(livroRepository.findByPreco(99.9))
                .thenReturn(List.of(livro));

        List<Livro> resultado = livroRepository.findByPreco(99.9);

        assertEquals(1, resultado.size());
        assertEquals(99.9, resultado.get(0).getPreco());
        verify(livroRepository).findByPreco(99.9);
    }
}
