package com.example.demo.repository;

import com.example.demo.model.Livro;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@DataJpaTest
@ActiveProfiles("test")
public class LivroRepositoryIT {

    @Autowired
    private LivroRepository livroRepository;

    @Test
    void deveSalvarELerLivro() {
        // cria um livro real
        Livro livro = new Livro();
        livro.setTitulo("Clean Architecture");
        livro.setGenero("Tecnologia");
        livro.setPreco(120.0);
        livro.setDescricao("Livro sobre arquitetura de software");

        // salva no banco (H2)
        livroRepository.save(livro);

        // busca todos
        List<Livro> todos = livroRepository.findAll();

        assertFalse(todos.isEmpty());
        assertEquals("Clean Architecture", todos.get(0).getTitulo());
    }

    @Test
    void deveBuscarPorId() {
        Livro livro = new Livro();
        livro.setTitulo("Domain-Driven Design");
        livro.setGenero("Tecnologia");
        livro.setPreco(150.0);
        livro.setDescricao("Livro sobre modelagem de domínio");

        Livro salvo = livroRepository.save(livro);

        Optional<Livro> encontrado = livroRepository.findById(salvo.getId());
        assertTrue(encontrado.isPresent());
        assertEquals("Domain-Driven Design", encontrado.get().getTitulo());
    }

    @Test
    void deveFiltrarPorGenero() {
        Livro l1 = new Livro(); l1.setTitulo("Java 21"); l1.setGenero("Tecnologia"); l1.setPreco(100.0);
        Livro l2 = new Livro(); l2.setTitulo("Harry Potter"); l2.setGenero("Fantasia"); l2.setPreco(80.0);
        livroRepository.saveAll(List.of(l1, l2));

        List<Livro> resultado = livroRepository.findByGeneroContainingIgnoreCase("tecnologia");

        assertEquals(1, resultado.size());
        assertEquals("Java 21", resultado.get(0).getTitulo());
    }

    @Test
    void deveUsarConsultaPersonalizadaFiltrarLivros() {
        Livro l1 = new Livro(); l1.setTitulo("Python"); l1.setGenero("Tecnologia"); l1.setPreco(90.0);
        Livro l2 = new Livro(); l2.setTitulo("C++ Básico"); l2.setGenero("Tecnologia"); l2.setPreco(150.0);
        livroRepository.saveAll(List.of(l1, l2));

        List<Livro> resultado = livroRepository.filtrarLivros("Python", "Tecnologia", 100.0);

        assertEquals(1, resultado.size());
        assertEquals("Python", resultado.get(0).getTitulo());
    }
}
