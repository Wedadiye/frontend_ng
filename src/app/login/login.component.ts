import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  constructor(private router: Router) { }
  login() {
    // Mettez en œuvre votre logique de connexion ici
    console.log('Logging in...');
    this.router.navigate(['/homeAdmin']);

  }

}
