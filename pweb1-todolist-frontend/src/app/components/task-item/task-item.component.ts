import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../../model/Tarefa';

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
  @Output() onToggleConcluido = new EventEmitter<Tarefa>();

  // Método que será executado ao clicar no ícone "x"
  onDelete(tarefa: Tarefa) {
    // Envia a tarefa pro task.components.ts
    this.onDeleteTask.emit(tarefa);
  }

  onEdit(tarefa: Tarefa) {
    // TODO: Será implementado em breve
  }

  // Marca a tarefa como "concluída"
  onToggle(tarefa: Tarefa) {
    this.onToggleConcluido.emit(tarefa);
  }
}


