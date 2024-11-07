import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <button (click)="loginWithGoogle()" class="google-btn">
        Iniciar sesión con Google
      </button>
    </div>
  `
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  }
}