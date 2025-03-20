package br.edu.ifpb.cartaxo.todo_list.service;

import br.edu.ifpb.cartaxo.todo_list.model.Tarefa;
import br.edu.ifpb.cartaxo.todo_list.repositories.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TarefaService {

    // Injetando dependência do repositório
    @Autowired
    private TarefaRepository tarefaRepository;

    // Retorna todas as tarefas cadastradas
    public List<Tarefa> getTarefas() {
        return this.tarefaRepository.findAll();
    }

    // TODO: Teste do filtro
    public List<Tarefa> filtrarTarefas(String titulo, String categoria) {
        return tarefaRepository.filtrarPorTituloECategoria(titulo, categoria);
    }

    // Busca uma tarefa por id
    //    public Tarefa getTarefaPorId(Long id) {
    //        return this.tarefaRepository.findById(id)
    //                .orElse(null);
    //    }

    public Tarefa getTarefaPorId(Long id) {
        return this.tarefaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tarefa com o ID = " + id + " não encontrada"
                ));
    }

    // Adiciona uma nova tarefa
    @Transactional
    public Tarefa inserirTarefa(Tarefa tarefa) {
        if (tarefa.getTitulo() == null || tarefa.getTitulo().isEmpty()) {
            // Lança exceção caso a tarefa que está sendo cadastrada não tenha título
            throw new RuntimeException("O título da tarefa é obrigatório");
        }

        // Se não lançar exceção, salva a tarefa
        return this.tarefaRepository.save(tarefa);
    }

    // Atualiza uma tarefa existente
    //    public Tarefa atualizarTarefa(Long id, Tarefa obj) {
    //        Tarefa tarefa = tarefaRepository.getReferenceById(id);
    //        tarefa.setTitulo(obj.getTitulo());
    //        tarefa.setCategoria(obj.getCategoria());
    //        tarefa.setConcluido(obj.getConcluido());
    //
    //        return tarefaRepository.save(tarefa);
    //    }

    // Atualiza uma tarefa existente
    public Tarefa atualizarTarefa(Long id, Tarefa obj) {
        // Verifica se a tarefa existe antes de atualizar
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tarefa não encontrada com o ID: " + id
                ));

        tarefa.setTitulo(obj.getTitulo());
        tarefa.setCategoria(obj.getCategoria());
        tarefa.setConcluido(obj.getConcluido()); // Use "isConcluido()" para boolean

        return tarefaRepository.save(tarefa);
    }

    //    // Remove uma tarefa a partir de um id
    //    public void apagar(Long id) {
    //        this.tarefaRepository.deleteById(id);
    //    }

    public void apagar(Long id) {
        // Verifica se a tarefa existe
        if (!tarefaRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Tarefa com o ID = " + id + " não encontrada"
            );
        }
        this.tarefaRepository.deleteById(id);
    }
}