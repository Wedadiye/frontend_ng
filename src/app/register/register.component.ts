import { Component } from '@angular/core';
import { ServiceLoginService } from '../services/service-login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  message: string = ''; // Définir la propriété message

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  };

  constructor(private router :Router
     ,private loginService: ServiceLoginService // Injecter MatSnackBar
  ) {}
  

  passwordVisible: boolean = false;

togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

  passwordMismatch: boolean = false;

validatePassword() {
  // Vérification de la correspondance à chaque saisie
  if (this.formData.password.length !== this.formData.confirmPassword.length) {
    this.passwordMismatch = true;
    return;
  }

  for (let i = 0; i < this.formData.password.length; i++) {
    if (this.formData.password.charAt(i) !== this.formData.confirmPassword.charAt(i)) {
      this.passwordMismatch = true;
      return;
    }
  }

  // Si tous les caractères correspondent, la validation réussit
  this.passwordMismatch = false;
}

  
  
  onSubmit(): void {

        // Vérifier si le mot de passe a au moins 5 caractères
        if (this.formData.password.length < 5) {
          // Définir le message d'erreur
          this.message = "Le mot de passe doit avoir au moins 5 caractères.";
          return;
        }
    const userData = {
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password
    };
    this.message = '';


    this.loginService.createUser(userData).subscribe(
      response => {
        console.log('Utilisateur créé avec succès :', response);
           // Afficher la Sweet Alert
      Swal.fire({
        icon: 'success',
        title: 'Bienvenue!',
        text: 'Veuillez vous connecter maintenant',
      });  
        this.router.navigate(['/login']); // Redirection vers la page de connexion
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
      }
    );
  }

}
