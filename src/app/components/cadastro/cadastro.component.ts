import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../model/Usuario';
import { Router } from '@angular/router';
import { MensagemSweetService } from '../../services/mensagem-sweet.service';  // Importe o serviço de mensagens

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  mensagemErro: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private mensagemService: MensagemSweetService  // Injete o serviço de mensagens
  ) {
    this.cadastroForm = this.fb.group({
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
        // Mensagem de sucesso após cadastro
        this.mensagemService.sucesso('Usuário cadastrado com sucesso!');
        console.log("Usuário cadastrado com sucesso!");
        this.router.navigate(['/login']); // Redireciona para a tela de login
      },
      (erro) => {
        // Mensagem de erro após falha no cadastro
        this.mensagemService.erro(`Erro ao cadastrar usuário: ${erro.message || erro}`);
        console.error("Erro ao cadastrar usuário:", erro);
        this.mensagemErro = "Erro ao cadastrar usuário.";
      }
    );
  }
}
