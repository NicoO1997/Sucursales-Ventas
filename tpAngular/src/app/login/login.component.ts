import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(response => {
      if (response.status === 'success') {
        this.message = 'Login successful';
        // Guarda el token o redirige al usuario
      } else {
        this.message = response.message;
      }
    });
  }
}
