package com.example.demo.controller;

import com.example.demo.model.ListaDesejo;
import com.example.demo.service.ListaDesejosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lista-desejos")
@CrossOrigin(
    origins = "http://localhost:4200",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.OPTIONS}
)
public class ListaDesejosController {

    @Autowired
    private ListaDesejosService listaDesejosService;

    @PostMapping("/adicionar/{livroId}")
    public ResponseEntity<ListaDesejo> adicionar(
            @PathVariable Long livroId,
            @RequestParam String nomeUsuario) {

        ListaDesejo novoItem = listaDesejosService.adicionar(livroId, nomeUsuario);
        return ResponseEntity.ok(novoItem);
    }

    @GetMapping
    public ResponseEntity<List<ListaDesejo>> listar(@RequestParam String nomeUsuario) {
        List<ListaDesejo> lista = listaDesejosService.listar(nomeUsuario);
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<Void> remover(
        @PathVariable Long id,
        @RequestParam String nomeUsuario) {

        listaDesejosService.remover(id, nomeUsuario);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/remover-por-livro/{livroId}")
    public ResponseEntity<Void> removerPorLivro(
            @PathVariable Long livroId,
            @RequestParam String nomeUsuario) {
        listaDesejosService.removerPorLivro(livroId, nomeUsuario);
        return ResponseEntity.noContent().build();
    }

}
