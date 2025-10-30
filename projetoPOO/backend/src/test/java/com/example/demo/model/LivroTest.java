package com.example.demo.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


public class LivroTest {

    @Test
    void deveCriarLivroCorretamente() {
        Livro livro = new Livro();
        livro.setId(1L);
        livro.setTitulo("Clean Code");
        livro.setGenero("Tecnologia");
        livro.setPreco(99.9);
        livro.setDescricao("Um livro sobre boas práticas de código limpo");

        assertEquals(1L, livro.getId());
        assertEquals("Clean Code", livro.getTitulo());
        assertEquals("Tecnologia", livro.getGenero());
        assertEquals(99.9, livro.getPreco());
        assertEquals("Um livro sobre boas práticas de código limpo", livro.getDescricao());
    }

    @Test
    void devePermitirAlterarAtributos() {
        Livro livro = new Livro();
        livro.setTitulo("Antigo Título");
        assertEquals("Antigo Título", livro.getTitulo());

        livro.setTitulo("Novo Título");
        assertEquals("Novo Título", livro.getTitulo());
    }
}
