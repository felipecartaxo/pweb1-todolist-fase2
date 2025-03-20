import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  // Recebe a estilização do botão a partir do formulário de cadastro
  @Input() text: string = "";
  @Input() color: string = "";
  // Envia um Output para o componente pai
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
