import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../model/Tarefa';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  // Variável que vai armazenar a lista de tarefas
  tarefas: Tarefa[] = [];

  constructor(private taskService: TaskService) {}

  // Após o construtor, o ngOnInit será chamado e irá listar todas as tarefas
  ngOnInit() {

    this.taskService.getTasks().subscribe((dado) => {
      // Armazena a lista de tarefas que foi retornada pelo serviço getTasks
      this.tarefas = dado;

      // Apenas para fins de teste
      console.log(dado);
    });
  }

  deleteTask(tarefa: Tarefa){
    this.taskService.deleteTask(tarefa).subscribe(() =>
      (this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id)));
  }

  toggleConcluido(tarefa: Tarefa) {
    tarefa.concluido = !tarefa.concluido;
    this.taskService.updateTask(tarefa).subscribe();
  }
}
