package com.example.demo.repository;
import java.util.List;
import com.example.demo.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    
    List<Livro> findByTituloContainingIgnoreCase(String titulo);
    List<Livro> findByPreco(double preco);
    List<Livro> findByGeneroContainingIgnoreCase(String genero);
}
