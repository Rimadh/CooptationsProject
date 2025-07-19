import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
[x: string]: any;
  isLoading = false;
  errorMessage = '';

  constructor(public auth: AuthService) {}

  async login() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this.auth.login();
    } catch (error) {
      this.errorMessage = 'Échec de la connexion. Veuillez réessayer.';
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    this.auth.logout();
  }

  getInitials(name: string = ''): string {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }
}