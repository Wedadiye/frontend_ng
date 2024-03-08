import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private readonly apiUrl = 'http://127.0.0.1:8000/ecommerce/produits/';

  private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public products$: Observable<any[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  
  private getHeaders(): HttpHeaders | null {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token utilisateur manquant');
      return null;
    }

    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }
/*

  getProducts(): Observable<any[]> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des produits:', error);
        return throwError('Erreur lors de la récupération des produits');
      })
    );
  }
*/
  addProduct(productData: any): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    return this.http.post<any>(this.apiUrl, productData, { headers }).pipe(
      catchError(error => {
        return throwError('Erreur lors de l\'ajout du produit');
      }),
      
    );
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    const url = `${this.apiUrl}${productId}/`;
    return this.http.put<any>(url, productData, { headers }).pipe(
      catchError(error => {
        return throwError('Erreur lors de la mise à jour du produit');
      }),
      tap(() => {
        // Vous pouvez ajouter ici tout code de gestion supplémentaire après la mise à jour du produit
      })
    );
  }

  deleteProduct(productId: number): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    const url = `${this.apiUrl}${productId}/`;
    return this.http.delete<any>(url, { headers }).pipe(
      catchError(error => {
        return throwError('Erreur lors de la suppression du produit');
      }),
      tap(() => {
        // Vous pouvez ajouter ici tout code de gestion supplémentaire après la suppression du produit
      })
    );
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}${id}/`);

  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/ecommerce/products/category/' + categoryId);
  }

  updateProducts(products: any[]) {
    this.productsSubject.next(products);
  }
  

}
/*
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }
  private readonly apiUrl = 'http://127.0.0.1:8000/ecommerce/produits/';

getProducts(): Observable<any[]> {
  // Remplacez 'your_api_endpoint' par l'URL de votre API pour récupérer la liste des produits
  return this.http.get<any[]>(this.apiUrl);

}

getProductsByCategory(categoryId: number): Observable<any[]> {
  // Remplacez 'your_api_endpoint/products' par l'URL de votre API pour récupérer les produits par catégorie
  return this.http.get<any[]>('http://127.0.0.1:8000/ecommerce/products/category/' + categoryId);
}
}
*/