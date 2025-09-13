package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.example.demo.model.Livro;
import com.example.demo.repository.LivroRepository;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository){
        this.livroRepository = livroRepository;
    }
    public List<Livro> listartodos(){
        return livroRepository.findAll();
    }
    public Optional<Livro> buscaporID(Long id){
        return livroRepository.findById(id);
    }
    public List<Livro> buscaporTitulo (String titulo){
        return livroRepository.findByTituloContainingIgnoreCase(titulo);
    }
    public List<Livro> buscarporGenero(String genero){
        return livroRepository.findByGeneroContainingIgnoreCase(genero);
    }
    public List<Livro> buscarporPreco(double preco){
        return livroRepository.findByPreco(preco);
    }
    public Livro salvar(Livro livro){
        return livroRepository.save(livro);
    }
    public void deletarporID(Long id){
        livroRepository.deleteById(id);
    }

}