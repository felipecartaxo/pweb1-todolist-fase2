import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter();

  titulo: string = "";
  categoria: string = "";
  // Ao criar uma nova tarefa, a mesma deve iniciar como "não concluída"
  concluido: boolean = false;
  // Visualização do botão para adicionar uma nova tarefa
  mostrarAddTarefa: boolean = false;

  onSubmit() {
    // console.log(this.titulo, this.categoria);
    // TODO: Substitua isso por um modal
    if ((!this.titulo)) {
      alert("O título é obrigatório!")
      return;
    }

    const novaTarefa = {
      titulo: this.titulo,
      categoria: this.categoria,
      concluido: this.concluido
    }

    // Envia para o task-component a tarefa a ser cadastrada
    this.onAddTask.emit(novaTarefa);

    // Após enviar a tarefa a ser cadastrada, limpa o formulário
    this.titulo = "";
    this.categoria = "";
    this.concluido = false;

  }

  alteraVisualizacao(valor: boolean) {
    this.mostrarAddTarefa = valor;
  }
}
