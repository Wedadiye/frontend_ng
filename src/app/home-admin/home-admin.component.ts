import { Component } from '@angular/core';
import { ServiceLoginService } from '../services/service-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  
  constructor(
   private loginService: ServiceLoginService ,
   public router: Router

  ){}  
   // Méthode pour déconnecter l'utilisateur
   logout(): void {
    this.loginService.logout().subscribe(
      () => {
        // En cas de succès, effacez le token localement, les informations de l'utilisateur et redirigez l'utilisateur vers la page de connexion
        localStorage.removeItem('token');
        localStorage.removeItem('User');
        this.router.navigate(['/login']);

      },
      error => {
        console.error('Error logging out:', error);
        // Gérez les erreurs de déconnexion ici
      }
    );
  }

}
