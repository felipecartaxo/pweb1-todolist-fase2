import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nome: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onLogin() {
    this.usuarioService.login(this.nome, this.senha).subscribe(usuario => {
      if (usuario) {
        console.log("Usuário logado com sucesso:", usuario);
        this.router.navigate(['/tasks']);  // Redireciona para as tarefas
      } else {
        this.mensagemErro = 'Usuário ou senha incorretos';
      }
    });
  }
}

