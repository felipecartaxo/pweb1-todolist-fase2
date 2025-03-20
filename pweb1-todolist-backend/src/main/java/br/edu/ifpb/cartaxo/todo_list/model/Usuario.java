package br.edu.ifpb.cartaxo.todo_list.model;

import jakarta.persistence.*;

@Entity
@Table(name="tb_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String password;

    public Usuario() {
    }

    public Usuario(String nome, String password) {
        this.nome = nome;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}