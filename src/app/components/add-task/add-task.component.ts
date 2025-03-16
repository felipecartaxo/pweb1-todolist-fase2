import { Component, EventEmitter, Output } from '@angular/core';
import { Tarefa } from '../../model/Tarefa';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter<Tarefa>();

  titulo: string = "";
  categoria: string = "";
  // Ao criar uma nova tarefa, a mesma deve iniciar como "não concluída"
  concluido: boolean = false;
  // Visualização do botão para adicionar uma nova tarefa
  mostrarAddTarefa: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  onSubmit() {
    // console.log(this.titulo, this.categoria);
    // TODO: Substitua isso por um modal
    if (!this.titulo) {
      alert("O título é obrigatório!");
      return;
    }

    const usuario = this.usuarioService.getUsuarioLogado();
    if (!usuario) {
      alert("Erro: Nenhum usuário logado.");
      return;
    }

    const novaTarefa: Tarefa = {
      titulo: this.titulo,
      categoria: this.categoria,
      concluido: this.concluido,
      usuarioID: usuario.id!
    };

    // Envia para o task-component a tarefa a ser cadastrada
    this.onAddTask.emit(novaTarefa);

    // Após enviar a tarefa a ser cadastrada, limpa o formulário
    this.titulo = "";
    this.categoria = "";
    this.concluido = false;
    this.mostrarAddTarefa = false;  // Ocultar o formulário após adicionar a tarefa
  }

  alteraVisualizacao(valor: boolean) {
    this.mostrarAddTarefa = valor;
  }
}
