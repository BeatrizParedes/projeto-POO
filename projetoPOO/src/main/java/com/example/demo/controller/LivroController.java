package com.example.demo.controller;

import com.example.demo.model.Livro;
import com.example.demo.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/livros")

public class LivroController {
    
    private final LivroService livroService;
    @Autowired
    public LivroController(LivroService livroService){
        this.livroService = livroService;
    }

    @GetMapping
    public List<Livro> listartodos(){
        return livroService.listartodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscaporID(@PathVariable Long id){
        Optional<Livro> livro = livroService.buscaporID(id);
        return livro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/titulo")
    public List<Livro> buscarporTitulo(@RequestParam String titulo){
        return livroService.buscaporTitulo(titulo);
    }

    @GetMapping("/genero")
    public List<Livro> buscarporGenero(@RequestParam String genero){
        return livroService.buscarporGenero(genero);
    }

    @GetMapping("/preco")
    public List<Livro> buscarporPreco(@RequestParam double preco){
        return livroService.buscarporPreco(preco);
    }

    @PostMapping
    public Livro salvar(@RequestBody Livro livro){
        return livroService.salvar(livro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarporID(@PathVariable Long id){
        livroService.deletarporID(id);
        return ResponseEntity.noContent().build();
    }
    

}
