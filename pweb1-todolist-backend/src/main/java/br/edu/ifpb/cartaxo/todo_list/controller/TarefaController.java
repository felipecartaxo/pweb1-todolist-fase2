package br.edu.ifpb.cartaxo.todo_list.controller;

import br.edu.ifpb.cartaxo.todo_list.model.Tarefa;
import br.edu.ifpb.cartaxo.todo_list.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    // Retorna todas as tarefas
    @GetMapping("/tarefas")
    public ResponseEntity<List<Tarefa>> getTarefas() {
        List<Tarefa> tarefas = tarefaService.getTarefas();
        return ResponseEntity.ok().body(tarefas); // HTTP 200
    }

    // Filtro
    @GetMapping("/tarefas/filtrar")
    public ResponseEntity<List<Tarefa>> filtrarTarefas(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String categoria) {

        List<Tarefa> tarefasFiltradas = tarefaService.filtrarTarefas(titulo, categoria);
        return ResponseEntity.ok().body(tarefasFiltradas); // HTTP 200
    }

    // Busca por ID
    @GetMapping("/tarefas/{id}")
    public ResponseEntity<Tarefa> getTarefaPorId(@PathVariable Long id) {
        Tarefa tarefa = tarefaService.getTarefaPorId(id);
        return ResponseEntity.ok().body(tarefa); // HTTP 200 (ou 404 se lançar exceção)
    }

    // Cadastra uma nova tarefa
    @PostMapping("/tarefas")
    public ResponseEntity<Tarefa> inserirTarefa(@RequestBody Tarefa tarefa) {
        Tarefa tarefaCriada = tarefaService.inserirTarefa(tarefa);
        return ResponseEntity.status(HttpStatus.CREATED).body(tarefaCriada); // HTTP 201
    }

    // Atualiza uma tarefa existente
    @PutMapping("/tarefas/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(
            @PathVariable Long id,
            @RequestBody Tarefa tarefa
    ) {
        Tarefa tarefaAtualizada = tarefaService.atualizarTarefa(id, tarefa);
        return ResponseEntity.ok().body(tarefaAtualizada); // HTTP 200
    }

    // Remove uma tarefa a partir do id
    @DeleteMapping("/tarefas/{id}")
    public ResponseEntity<Void> apagarTarefa(@PathVariable Long id) {
        tarefaService.apagar(id);
        return ResponseEntity.noContent().build(); // HTTP 204 (mais semântico para DELETE)
    }
}