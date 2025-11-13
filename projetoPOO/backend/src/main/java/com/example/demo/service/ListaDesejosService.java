package com.example.demo.service;

import com.example.demo.model.ListaDesejo;
import com.example.demo.model.Livro;
import com.example.demo.repository.ListaDesejosRepository;
import com.example.demo.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
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

    public void remover(Long id, String nomeUsuario) {
        System.out.println("Removendo item " + id + " da lista de " + nomeUsuario);
        listaDesejosRepository.deleteById(id);
    }

    @Transactional
    public void removerPorLivro(Long livroId, String nomeUsuario) {
        System.out.println("Removendo livro " + livroId + " da lista de " + nomeUsuario);
        listaDesejosRepository.deleteByNomeUsuarioAndLivro_Id(nomeUsuario, livroId);
    }
}
