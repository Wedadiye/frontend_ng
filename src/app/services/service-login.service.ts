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
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  private readonly apiUrl = 'http://127.0.0.1:8000/api/user/token/';
  private token: string = ''; // Variable pour stocker le token

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password })
      .pipe(
        tap((response: { token: string; }) => {
          // Stocker le token après une connexion réussie
          this.token = response.token;
        })
      );
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
}
