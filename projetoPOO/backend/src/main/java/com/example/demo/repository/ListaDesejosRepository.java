package com.example.demo.repository;

import com.example.demo.model.ListaDesejo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListaDesejosRepository extends JpaRepository<ListaDesejo, Long> {
    List<ListaDesejo> findByNomeUsuario(String nomeUsuario);
}
