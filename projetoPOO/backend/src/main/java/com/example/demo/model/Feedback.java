package com.example.demo.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Feedback {
    private Long id;
    private String autor;
    private String mensagem;
    private Integer nota;
    private Long livroId; 

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime criadoEm;

    public Long getId(){
        return id;
    }
    public void setId(Long id){ 
        this.id = id;
    }
    public String getAutor(){
        return autor; 
    }
    public void setAutor(String autor){ 
        this.autor = autor; 
    }
    public String getMensagem(){
        return mensagem;
    }
    public void setMensagem(String mensagem){
        this.mensagem = mensagem;
    }
    public Integer getNota(){
        return nota;
    }
    public void setNota(Integer nota){
        this.nota = nota;
    }
    public Long getLivroId() {
        return livroId;
    }
    public void setLivroId(Long livroId) {
        this.livroId = livroId;
    }
    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }
    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }
}
