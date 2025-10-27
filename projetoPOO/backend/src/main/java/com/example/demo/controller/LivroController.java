package com.example.demo.controller;

import com.example.demo.model.Livro;
import com.example.demo.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://localhost:4200")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> listar() {
        return livroService.listartodos();
    }

    @PostMapping
    public Livro salvar(@RequestBody Livro livro) {
        System.out.println("Recebido: " + livro.getTitulo() + ", " + livro.getPreco());
        return livroService.salvar(livro);
    }

    
   @GetMapping("/buscar")
    public ResponseEntity<List<Livro>> buscarLivros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) Double preco
    ) {
        List<Livro> livros = livroService.buscarComFiltros(titulo, genero, preco);
        return ResponseEntity.ok(livros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        return livroService.buscaporID(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        livroService.deletarporID(id);
        return ResponseEntity.noContent().build();
    }
}
