package com.example.demo.controller;

import com.example.demo.model.ListaDesejo;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        listaDesejosService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
