/*
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  private readonly apiUrl = 'http://127.0.0.1:8000/api/user/token/';

  constructor(private http: HttpClient) { }

  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/user/me/');
  }
}
*/import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  private readonly logoutUrl = 'http://127.0.0.1:8000/api/user/logout/';

  private readonly apiUrl = 'http://127.0.0.1:8000/api/user/';
  private token: string = 
  
  ''; // Variable pour stocker le token

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}token/`, { email, password })
      .pipe(
        tap((response: { token: string; }) => {
          // Stocker le token après une connexion réussie
          localStorage.setItem('token', response.token);

          this.token = response.token;

        })
      );
  }

  createUser(userData: any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}create/`, userData);
  }

  getUserInfo(): Observable<any> {
    // Vérifier d'abord si le token est disponible
    if (!this.token) {
      // Gérer l'erreur ici, par exemple, retourner un observable vide ou une erreur appropriée
      return throwError("Token d'utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.token}`
    });

    // Faire la requête HTTP avec le token inclus dans l'en-tête
    return this.http.get<any>('http://127.0.0.1:8000/api/user/me/', { headers });
  }
  
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
        return throwError("Token utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
    });

    // Faire la requête HTTP POST pour la déconnexion
    return this.http.post<any>(this.logoutUrl, null, { headers })
    
      .pipe(
        catchError(error => {
          return throwError("Une erreur s'est produite lors de la déconnexion.");
        })
      );
  }
  
  getUserProfile(): Observable<any> {
    
    const token = localStorage.getItem('token');
    if (!token) {
        return throwError("Token utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
    });

    // Endpoint pour récupérer le profil de l'utilisateur authentifié
    return this.http.get<any>(`${this.apiUrl}me/`,{headers});
  }

  updateUserProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
        return throwError("Token utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
    });

    // Endpoint pour mettre à jour le profil de l'utilisateur authentifié
    return this.http.put<any>(`${this.apiUrl}me/`, profileData,{headers});
  }
}
