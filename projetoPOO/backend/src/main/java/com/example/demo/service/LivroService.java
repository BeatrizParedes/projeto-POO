package com.example.demo.service;

import com.example.demo.model.Livro;
import com.example.demo.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> listartodos() {
        return livroRepository.findAll();
    }

    public Optional<Livro> buscaporID(Long id) {
        return livroRepository.findById(id);
    }

    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    public void deletarporID(Long id) {
        livroRepository.deleteById(id);
    }

    public List<Livro> buscarComFiltros(String titulo, String genero, Double preco) {
        return livroRepository.filtrarLivros(
                titulo != null && !titulo.isEmpty() ? titulo : null,
                genero != null && !genero.isEmpty() ? genero : null,
                preco != null ? preco : null
        );
    }
}
