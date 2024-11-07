import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  async logout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}