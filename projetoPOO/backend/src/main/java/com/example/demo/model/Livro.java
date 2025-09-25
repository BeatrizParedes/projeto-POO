package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String autor;
    private String genero;
    private String descricao;
    private double preco;

    public Livro(){
        
    }

    public Livro(String titulo, String autor, String genero, String descricao, double preco){
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.descricao = descricao;
        this.preco = preco;
    }

    public Long getId(){
        return id;
    }
    public void setId (Long id){
        this.id = id;
    }
    public String getTitulo(){
        return titulo;    
    }
    public void  setTitulo (String titulo){
        this.titulo = titulo;
    }
    public String getAutor(){
        return autor;
    }
    public void setAutor (String autor){
        this.autor = autor;
    }
    public String getGenero(){
        return genero;
    }
    public void setGenero (String genero){
        this.genero = genero;
    }
    public String getDescricao(){
        return descricao;
    }
    public void setDescricao (String descricao){
        this.descricao = descricao;
    }
    public double getPreco(){
        return preco;
    }
    public void setPreco (double preco){
        this.preco = preco;
    }
}

