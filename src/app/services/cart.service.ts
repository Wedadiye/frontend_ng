
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiUrl = 'http://localhost:8000/ecommerce/cart/';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<any> {
    // Vérifier d'abord si le token est disponible
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError("Token utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    // Faire la requête HTTP avec le token inclus dans l'en-tête
    return this.http.get<any>(`${this.apiUrl}get_cart_items/`, { headers })
      .pipe(
        catchError(error => {
          // Gérer les erreurs ici
          return throwError(error);
        })
      );
  }

  addToCart(productId: number): Observable<any> {
    // Vérifier d'abord si le token est disponible
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError("Token utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    // Faire la requête HTTP avec le token inclus dans l'en-tête
    return this.http.post<any>(`${this.apiUrl}add_to_cart/`, { product_id: productId }, { headers })
      .pipe(
        catchError(error => {
          // Gérer les erreurs ici
          return throwError(error);
        })
      );
  }

 
updateQuantity(item: any): Observable<any> {
    // Vérifier d'abord si le token est disponible
    const token = localStorage.getItem('token');
    if (!token) {
        return throwError("Token utilisateur manquant");
    }

    // Inclure le token dans l'en-tête de la requête
    const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
    });

    // Extraire les données de l'objet 'item'
    const productId = item.product_id;
    const newQuantity = item.quantity;

    // Faire la requête HTTP avec le token inclus dans l'en-tête
    return this.http.put<any>(`${this.apiUrl}update_quantity/`, { product_id: productId, quantity: newQuantity }, { headers })
        .pipe(
            catchError(error => {
                // Gérer les erreurs ici
                return throwError(error);
            })
        );
}
deleteFromCart(productId: number): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
      return throwError("Token utilisateur manquant");
  }

  const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
  });

  return this.http.delete<any>(`${this.apiUrl}delete_from_cart/`, { headers, body: { product_id: productId } })
      .pipe(
          catchError(error => {
              return throwError(error);
          })
      );
}

clearCart(): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    return throwError("Token utilisateur manquant");
  }

  const headers = new HttpHeaders({
    'Authorization': `Token ${token}`
  });

  // Envoyez une requête DELETE pour vider le panier
  return this.http.delete<any>(`${this.apiUrl}clear_cart/`, { headers }).pipe(
    catchError(error => {
      // Gérer les erreurs ici
      return throwError(error);
    })
  );
}
}
