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
  // Filtro de título
  filtro: string = '';
  // Filtro de categoria
  filtroCategoria: string = '';

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

  addTask(tarefa: Tarefa) {
    this.taskService.addTask(tarefa).subscribe((tarefa) => {
      // Lógica para listar a tarefa logo após criá-la
      this.tarefas.push(tarefa);
    });
  }

  toggleConcluido(tarefa: Tarefa) {
    tarefa.concluido = !tarefa.concluido;
    this.taskService.updateTask(tarefa).subscribe();
  }

  deleteTask(tarefa: Tarefa){
    this.taskService.deleteTask(tarefa).subscribe(() =>
      (this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id)));
  }

  // TODO: Comentei apenas para testar a conexão com o Spring
  // // // Variável que vai armazenar a lista de tarefas
  // tarefas: Tarefa[] = [];
  //  // Filtro de título
  // filtro: string = '';
  // // Filtro de categoria
  // filtroCategoria: string = '';

  // constructor(private taskService: TaskService) {}
  //
  // // Após o construtor, o ngOnInit será chamado e irá listar todas as tarefas
  // ngOnInit() {
  //   this.carregarTarefas();
  // }
  //
  // carregarTarefas() {
  //   this.taskService.getTasks().subscribe((dados: Tarefa[]) => {
  //     // Armazena a lista de tarefas que foi retornada pelo serviço getTasks
  //     this.tarefas = dados;
  //
  //     // Apenas para fins de teste
  //     console.log(dados);
  //   });
  // }
  //
  // addTask(tarefa: Tarefa) {
  //   this.taskService.addTask(tarefa).subscribe(() => {
  //     // Lógica para listar a tarefa logo após criá-la
  //     this.carregarTarefas();
  //   });
  // }
  //
  // toggleConcluido(tarefa: Tarefa) {
  //   tarefa.concluido = !tarefa.concluido;
  //   this.taskService.updateTask(tarefa).subscribe(() => {
  //     this.carregarTarefas();
  //   });
  // }
  //
  // deleteTask(tarefa: Tarefa) {
  //   if (tarefa.id) {
  //     this.taskService.deleteTask(tarefa.id).subscribe(() => {
  //       this.carregarTarefas();
  //     });
  //   }
  // }
  //

  /* buscarTarefas() {
      if (this.filtro.trim()) {
        this.taskService.pesquisarPorFiltro(this.filtro).subscribe((dados: Tarefa[]) => {
          this.tarefas = dados;
        });
      } else {
        this.carregarTarefas(); // Recarrega todas as tarefas se o filtro estiver vazio
      }
    } */

  buscarTarefas() {
    this.taskService.pesquisarPorFiltro(this.filtro, this.filtroCategoria).subscribe((dados: Tarefa[]) => {
      this.tarefas = dados;
    });
  }
}
