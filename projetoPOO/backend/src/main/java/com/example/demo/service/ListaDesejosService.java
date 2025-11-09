package com.example.demo.service;

import com.example.demo.model.ListaDesejo;
import com.example.demo.model.Livro;
import com.example.demo.repository.ListaDesejosRepository;
import com.example.demo.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaDesejosService {

    @Autowired
    private ListaDesejosRepository listaDesejosRepository;

    @Autowired
    private LivroRepository livroRepository;

    public ListaDesejo adicionar(Long livroId, String nomeUsuario) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        ListaDesejo item = new ListaDesejo(livro, nomeUsuario);
        return listaDesejosRepository.save(item);
    }
    public List<ListaDesejo> listar(String nomeUsuario) {
        return listaDesejosRepository.findByNomeUsuario(nomeUsuario);
    }
    public void remover(Long id) {
        listaDesejosRepository.deleteById(id);
    }
}
