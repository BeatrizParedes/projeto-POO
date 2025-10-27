package com.example.demo.service;

import com.example.demo.model.Livro;
import com.example.demo.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

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
        String t = (titulo == null || titulo.isBlank()) ? null : titulo.trim();
        String g = (genero == null || genero.isBlank()) ? null : genero.trim();
        Double p = preco; 

        return livroRepository.filtrarLivros(t, g, p);
    }
}
