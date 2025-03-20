package br.edu.ifpb.cartaxo.todo_list.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_tarefa")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titulo;
    // TODO: Colocar "categoria" como ENUM
    private String categoria;
    private boolean concluido;

    // Construtor nulo que é obrigatório para o Spring
    public Tarefa() {
    }

    // Construtor parametrizado
    public Tarefa(String titulo, String categoria, boolean concluido) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.concluido = concluido;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public boolean getConcluido() {
        return concluido;
    }

    public void setConcluido(boolean concluido) {
        this.concluido = concluido;
    }
}
