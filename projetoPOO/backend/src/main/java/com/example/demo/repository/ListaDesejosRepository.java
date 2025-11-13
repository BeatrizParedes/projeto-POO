package com.example.demo.repository;

import com.example.demo.model.ListaDesejo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ListaDesejosRepository extends JpaRepository<ListaDesejo, Long> {
    List<ListaDesejo> findByNomeUsuario(String nomeUsuario);

    Optional<ListaDesejo> findByNomeUsuarioAndLivro_Id(String nomeUsuario, Long livroId);

    @Transactional
    @Modifying
    @Query("DELETE FROM ListaDesejo ld WHERE ld.nomeUsuario = :nomeUsuario AND ld.livro.id = :livroId")
    void deleteByNomeUsuarioAndLivro_Id(@Param("nomeUsuario") String nomeUsuario, @Param("livroId") Long livroId);
}
