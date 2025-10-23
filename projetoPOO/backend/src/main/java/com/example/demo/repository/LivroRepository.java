package com.example.demo.repository;

import com.example.demo.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {

    // Já existente
    List<Livro> findByTituloContainingIgnoreCase(String titulo);

    // ✅ Adicionados para corrigir o erro no LivroService
    List<Livro> findByGeneroContainingIgnoreCase(String genero);
    List<Livro> findByPreco(Double preco);

    // Já existente — query customizada
    @Query("SELECT l FROM Livro l" +
            " WHERE (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%')))" +
            " AND (:genero IS NULL OR LOWER(l.genero) LIKE LOWER(CONCAT('%', :genero, '%')))" +
            " AND (:preco IS NULL OR l.preco = :preco)")
    List<Livro> filtrarLivros(@Param("titulo") String titulo,
                              @Param("genero") String genero,
                              @Param("preco") Double preco);
}
