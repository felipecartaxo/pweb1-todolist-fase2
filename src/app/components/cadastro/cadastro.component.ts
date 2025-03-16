import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../model/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  nome: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onCadastro() {
    const usuario: Usuario = { nome: this.nome, senha: this.senha };

    this.usuarioService.cadastrar(usuario).subscribe(
      () => {
        console.log("Usuário cadastrado com sucesso!");
        this.router.navigate(['/login']); //Redireciona para tela de login
      },
      (erro) => {
        console.error("Erro ao cadastrar usuário:", erro);
        this.mensagemErro = "Erro ao cadastrar usuário.";
      }
    );
  }
}

