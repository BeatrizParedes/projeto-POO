package com.example.demo.integration;

import com.example.demo.model.ListaDesejo;
import com.example.demo.model.Livro;
import com.example.demo.repository.ListaDesejosRepository;
import com.example.demo.repository.LivroRepository;
import com.example.demo.service.ListaDesejosService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest         
@Transactional          
class ListaDesejosServiceIT {

    @Autowired
    private ListaDesejosService listaDesejosService;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private ListaDesejosRepository listaDesejosRepository;

    @Test
    void deveAdicionarEListarLivroNaListaDeDesejos() {
    
        Livro livro = new Livro();
        livro.setTitulo("Clean Code");
        livro.setGenero("Programação");
        livro.setPreco(80.0);
        livro.setDescricao("Livro clássico");
        livro.setAutor("Robert C. Martin");

        livro = livroRepository.save(livro);

        String usuario = "cecilia";

        listaDesejosService.adicionar(livro.getId(), usuario);

        List<ListaDesejo> lista = listaDesejosService.listar(usuario);

        assertEquals(1, lista.size());
        assertEquals("Clean Code", lista.get(0).getLivro().getTitulo());
        assertEquals("cecilia", lista.get(0).getNomeUsuario());
    }

    @Test
    void deveRemoverDaListaPorLivroId() {

        Livro livro = new Livro();
        livro.setTitulo("Refactoring");
        livro.setGenero("Programação");
        livro.setPreco(90.0);
        livro.setDescricao("Outro clássico");
        livro.setAutor("Martin Fowler");

        livro = livroRepository.save(livro);

        String usuario = "cecilia";

        listaDesejosService.adicionar(livro.getId(), usuario);
        assertEquals(1, listaDesejosRepository.findByNomeUsuario(usuario).size());

        listaDesejosService.removerPorLivro(livro.getId(), usuario);

        List<ListaDesejo> aposRemocao = listaDesejosRepository.findByNomeUsuario(usuario);
        assertTrue(aposRemocao.isEmpty());
    }
}
