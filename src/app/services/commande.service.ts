import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {


  
  private readonly apiUrl = 'http://localhost:8000/ecommerce/commande/'; // Remplacez par l'URL de votre endpoint d'API

  constructor(private http: HttpClient) { }

  submitOrder(orderData: any): Observable<any> {
    // Vérifier d'abord si le token est disponible
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError("Token utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    
    return this.http.post<any>(this.apiUrl, orderData,{ headers });
  }
  
  getOrders(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError("Token utilisateur manquant");
    }

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}order_details/`, { headers });
  }
}
