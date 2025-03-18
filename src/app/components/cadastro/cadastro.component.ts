import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  //nome: string = '';
  //senha: string = '';
  cadastroForm: FormGroup;
  mensagemErro: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      //Validação nome mínimo de 3 caracteres e senha mínima de 6
      nome: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onCadastro() {
    if (this.cadastroForm.invalid) {
      return;
    }

    const usuario: Usuario = {
      nome: this.cadastroForm.value.nome,
      senha: this.cadastroForm.value.senha
    };

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



