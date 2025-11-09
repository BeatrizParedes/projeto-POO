package com.example.demo.repository;

import com.example.demo.model.Feedback;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class FeedbackRepository {

    private final JdbcTemplate jdbc;
    private final SimpleJdbcInsert insert;

    public FeedbackRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        this.insert = new SimpleJdbcInsert(jdbc.getDataSource())
                .withTableName("feedback")
                .usingGeneratedKeyColumns("id");
    }

    private static final BeanPropertyRowMapper<Feedback> ROW_MAPPER =
            new BeanPropertyRowMapper<>(Feedback.class);

    public List<Feedback> findAll() {
        String sql = """
            SELECT
              id,
              autor,
              mensagem,
              nota,
              livro_id  AS livroId,
              criado_em AS criadoEm
            FROM feedback
            ORDER BY id DESC
            """;
        return jdbc.query(sql, ROW_MAPPER);
    }

    public List<Feedback> findByLivro(Long livroId) {
        String sql = """
            SELECT
              id,
              autor,
              mensagem,
              nota,
              livro_id  AS livroId,
              criado_em AS criadoEm
            FROM feedback
            WHERE livro_id = ?
            ORDER BY id DESC
            """;
        return jdbc.query(sql, ROW_MAPPER, livroId);
    }

    public Feedback insert(Feedback f) {
        LocalDateTime agora = LocalDateTime.now();
        f.setCriadoEm(agora);

        Map<String, Object> params = new HashMap<>();
        params.put("autor", f.getAutor());
        params.put("mensagem", f.getMensagem());
        params.put("nota", f.getNota());
        params.put("livro_id", f.getLivroId());
        params.put("criado_em", Timestamp.valueOf(f.getCriadoEm()));

        Number key = insert.executeAndReturnKey(params);
        f.setId(key.longValue());
        return f;
    }
}
