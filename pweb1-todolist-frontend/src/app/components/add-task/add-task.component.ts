import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from '../../model/Tarefa';
import { UsuarioService } from '../../services/usuario.service';
import { MensagemSweetService } from '../../services/mensagem-sweet.service';  // Importe o serviço de mensagens

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter<Tarefa>();

  tarefaForm: FormGroup;
  // Visualização do botão para adicionar uma nova tarefa
  mostrarAddTarefa: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private mensagemService: MensagemSweetService  // Injetando o serviço de mensagens
  ) {
    this.tarefaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      categoria: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tarefaForm.invalid) {
      return;
    }

    const usuario = this.usuarioService.getUsuarioLogado();
    if (!usuario) {
      alert("Erro: Nenhum usuário logado.");
      return;
    }

    const novaTarefa: Tarefa = {
      titulo: this.tarefaForm.value.titulo,
      categoria: this.tarefaForm.value.categoria,
      // Ao criar uma nova tarefa, a mesma deve iniciar como "não concluída"
      concluido: false,
      usuarioID: usuario.id!
    };

    // Envia para o task-component a tarefa a ser cadastrada
    this.onAddTask.emit(novaTarefa);

    // Exibe a mensagem de sucesso
    this.mensagemService.sucesso('Tarefa adicionada com sucesso!');

    this.resetarFormulario();
  }

  // Ocultar o formulário após adicionar a tarefa
  alteraVisualizacao(valor: boolean) {
    this.mostrarAddTarefa = valor;
    if (valor) {
      this.resetarFormulario();
    }
  }

  // Após enviar a tarefa a ser cadastrada, limpa o formulário
  resetarFormulario() {
    this.tarefaForm.reset();
    this.tarefaForm.patchValue({ categoria: '' });
  }
}
