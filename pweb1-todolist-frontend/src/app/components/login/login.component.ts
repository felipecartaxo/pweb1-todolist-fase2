import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //nome: string = '';
  //senha: string = '';
  loginForm: FormGroup;
  mensagemErro: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { nome, senha } = this.loginForm.value;

    this.usuarioService.login(nome, senha).subscribe(usuario => {
      if (usuario) {
        console.log("Usuário logado com sucesso:", usuario);
        this.router.navigate(['/tasks']); // Redireciona para as tarefas
      } else {
        this.mensagemErro = 'Usuário ou senha incorretos';
      }
    });
  }
}



