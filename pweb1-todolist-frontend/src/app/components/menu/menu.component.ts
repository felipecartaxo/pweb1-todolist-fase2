import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  filtro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onLogout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']); // Redireciona para login ao deslogar
  }
}


