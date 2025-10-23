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

    // ✅ Atualizado: busca múltiplos livros, filtrando corretamente por título, gênero ou preço
    public List<Livro> buscarComFiltros(String titulo, String genero, Double preco) {

        // 👉 Se o título for informado, retorna todos os livros cujo título contenha o termo
        if (titulo != null && !titulo.isEmpty()) {
            return livroRepository.findByTituloContainingIgnoreCase(titulo);
        }

        // 👉 Se o gênero for informado, retorna todos os livros desse gênero
        else if (genero != null && !genero.isEmpty()) {
            return livroRepository.findByGeneroContainingIgnoreCase(genero);
        }

        // 👉 Se o preço for informado, retorna todos com esse preço exato
        else if (preco != null) {
            return livroRepository.findByPreco(preco);
        }

        // 👉 Se nenhum filtro for passado, retorna todos
        else {
            return livroRepository.findAll();
        }
    }
}
