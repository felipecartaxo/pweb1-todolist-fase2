import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private usuarioService: UsuarioService) {}

  get usuarioLogado(): boolean {
    return this.usuarioService.getUsuarioLogado() !== null;
  }
}


