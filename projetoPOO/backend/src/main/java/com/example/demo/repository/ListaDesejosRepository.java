package com.example.demo.repository;

import com.example.demo.model.ListaDesejos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListaDesejosRepository extends JpaRepository<ListaDesejos, Long> {
    List<ListaDesejos> findByNomeUsuario(String nomeUsuario);
}
