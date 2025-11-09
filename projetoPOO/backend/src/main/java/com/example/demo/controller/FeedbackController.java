package com.example.demo.controller;

import com.example.demo.model.Feedback;
import com.example.demo.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service){
        this.service = service;
    }

    @GetMapping
    public List<Feedback> listar(){
        return service.listar();
    }

    @GetMapping("/livro/{livroId}")
    public List<Feedback> listarPorLivro(@PathVariable Long livroId){
        return service.listarPorLivro(livroId);
    }

    @PostMapping
    public Feedback criar(@RequestBody Feedback f){
        return service.criar(f);
    }
}
