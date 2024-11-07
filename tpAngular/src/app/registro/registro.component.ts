import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  template: `
    <div class="registro-container">
      <h2>Registro</h2>
      <button (click)="registerWithGoogle()" class="google-btn">
        Registrarse con Google
      </button>
    </div>
  `
})
export class RegistroComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async registerWithGoogle() {
    try {
      await this.authService.registerWithGoogle();
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Error al registrarse:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  }
}