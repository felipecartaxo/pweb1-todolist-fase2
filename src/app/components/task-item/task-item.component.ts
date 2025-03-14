import {Component, Input} from '@angular/core';
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
}
