/*
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../services/service-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  
    // Mettez en œuvre votre logique de connexion ici
    email: string = '';
    password: string = '';
  
    constructor(private authService: ServiceLoginService,private router: Router) {}
  
    login() {
      this.authService.login(this.email, this.password)
        .subscribe(
          response => {
            // Gérer la rponse du backend, par exemple, stocker le token dans le local storage
            this.router.navigate(['/home']);

            console.log('Login réussi');
          },
          error => {
            console.error('Échec de la connexion');
          }
        );
    }
    


  }
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../services/service-login.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  userInfo: any; // Déclaration de la variable userInfo

  constructor(private authService: ServiceLoginService, 
    private router: Router ) {}

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          // Connexion réussie, récupérer les informations de l'utilisateur
          this.authService.getUserInfo()
            .subscribe(
              userInfo => {
                this.userInfo = userInfo; // Assignation des informations de l'utilisateur récupérées
                // Vérifier si l'utilisateur n'est pas un administrateur (is_staff = false)
                if (!this.userInfo.is_superuser) {
                  // Stocker les informations de l'utilisateur dans le local storage, par exemple
                  localStorage.setItem('currentUser', JSON.stringify(this.userInfo));
                  // Naviguer vers la page d'accueil

                  this.router.navigate(['/home']);
                } else {

                  localStorage.setItem('currentUser', JSON.stringify(this.userInfo));
                  this.router.navigate(['/homeAdmin']);
                }
              },

              error => {
                console.error('Impossible de récupérer les informations de l\'utilisateur');
                
              }
            );
        },
        
      error => {
        console.error('Échec de la connexion', error);
         Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Mot de passe ou e-mail incorrect',
        });
      }
      );
      
  }
}
