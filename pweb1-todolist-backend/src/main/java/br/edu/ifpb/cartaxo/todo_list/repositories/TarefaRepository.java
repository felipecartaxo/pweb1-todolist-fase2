package br.edu.ifpb.cartaxo.todo_list.repositories;

import br.edu.ifpb.cartaxo.todo_list.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    // --------- Consultas personalizadas ---------

    // Buscar tarefa(s) a partir de um título específico
    public List<Tarefa> findByTitulo(String titulo);

    // Buscar apenas as tarefas concluídas
    @Query("SELECT t FROM Tarefa t where t.concluido=true")
    public List<Tarefa> findByConcluido();

    // Buscar as tarefas de uma determinada categoria
    public List<Tarefa> findByCategoria(String categoria);

    @Query("SELECT t FROM Tarefa t WHERE " +
            "(LOWER(t.titulo) LIKE LOWER(CONCAT('%', :titulo, '%')) OR :titulo IS NULL) AND " +
            "(t.categoria = :categoria OR :categoria IS NULL)")
    List<Tarefa> filtrarPorTituloECategoria(
            @Param("titulo") String titulo,
            @Param("categoria") String categoria);
}