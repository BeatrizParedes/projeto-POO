package com.example.demo.service;

import com.example.demo.model.Feedback;
import com.example.demo.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository repo;

    public FeedbackService(FeedbackRepository repo) {
        this.repo = repo;
    }

    public List<Feedback> listar() {
        return repo.findAll();
    }

    public List<Feedback> listarPorLivro(Long livroId) {
        return repo.findByLivro(livroId);
    }

    public Feedback criar(Feedback f) {
        return repo.insert(f);
    }
}
