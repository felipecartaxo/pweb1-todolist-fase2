import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Tarefa} from '../../model/Tarefa';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  // A "!" indica que tarefa não precisa ser inicializada e que essa variável terá um valor
  @Input() tarefa!: Tarefa;
  @Output() onDeleteTask = new EventEmitter<Tarefa>();

  // Método que será executado ao clicar no ícone "x"
  onDelete(tarefa: Tarefa) {
    // Envia a tarefa pro task.components.ts
    this.onDeleteTask.emit(tarefa);
  }
}
