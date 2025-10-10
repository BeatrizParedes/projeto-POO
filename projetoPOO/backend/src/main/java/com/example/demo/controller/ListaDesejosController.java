package com.example.demo.controller;

import com.example.demo.model.ListaDesejos;
import com.example.demo.service.ListaDesejosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lista-desejos")
@CrossOrigin(origins = "http://localhost:4200") // permite o Angular acessar
public class ListaDesejosController {

    @Autowired
    private ListaDesejosService listaDesejosService;

    // Adicionar um livro à lista de desejos
    @PostMapping("/adicionar/{livroId}")
    public ResponseEntity<ListaDesejos> adicionar(
            @PathVariable Long livroId,
            @RequestParam String nomeUsuario) {

        ListaDesejos novoItem = listaDesejosService.adicionar(livroId, nomeUsuario);
        return ResponseEntity.ok(novoItem);
    }

    // Listar desejos por usuário
    @GetMapping
    public ResponseEntity<List<ListaDesejos>> listar(@RequestParam String nomeUsuario) {
        List<ListaDesejos> lista = listaDesejosService.listar(nomeUsuario);
        return ResponseEntity.ok(lista);
    }

    // Remover item da lista de desejos
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        listaDesejosService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
