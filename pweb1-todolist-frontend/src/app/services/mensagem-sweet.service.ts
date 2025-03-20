import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensagemSweetService {

  constructor() { }

  // Exibe uma mensagem de alerta de informação
  info(mensagem: string) {
    Swal.fire({
      title: 'Atenção!',
      text: mensagem,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

  // Exibe uma mensagem de erro
  erro(mensagem: string) {
    Swal.fire({
      title: 'Erro!',
      text: mensagem,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  // Exibe uma mensagem de sucesso
  sucesso(mensagem: string) {
    Swal.fire({
      title: 'Sucesso!',
      text: mensagem,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  // Exibe um alerta de confirmação antes de excluir
  confirmacao(titulo: string, mensagem: string) {
    return Swal.fire({
      title: titulo,
      text: mensagem,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });
  }
}
