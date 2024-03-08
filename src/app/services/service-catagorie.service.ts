/*
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCatagorieService {

  private readonly apiUrl = 'http://127.0.0.1:8000/ecommerce/categories/';

  constructor(private http: HttpClient) { }
  categories: any[] = []; // Déclaration de categoriesArray

  getHeaders(): HttpHeaders | null{
    // Récupérer le token à partir du localStorage
    const token = localStorage.getItem('token');
  
    // Vérifier si le token existe
    if (!token) {
      // Si le token n'existe pas, retourner un message d'erreur
      console.error('Token utilisateur manquant');
      // Vous pouvez également utiliser un toast ou un autre mécanisme pour afficher un message à l'utilisateur
      // Retourner les en-têtes sans le token, ou null si vous souhaitez annuler la requête
      return null;
    }
    
    // Créer les en-têtes avec le token
    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }
  

  getCategories(): Observable<any[]> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    return this.http.get<any[]>(this.apiUrl, { headers: headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
        return throwError('Erreur lors de la récupération des catégories');
      })
    );
  }

  addCategory(categoryData: any): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    return this.http.post<any>(this.apiUrl, categoryData, { headers:headers });
  }

  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    const url = `${this.apiUrl}${categoryId}/`;
    return this.http.put<any>(url, categoryData, { headers: headers});
  }

  deleteCategory(categoryId: number): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    const url = `${this.apiUrl}${categoryId}/`;
    return this.http.delete<any>(url, { headers: headers});

  }


  refreshCategories() {
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }


}
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CategoryEventService } from './category-event.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCatagorieService {

  private readonly apiUrl = 'http://127.0.0.1:8000/ecommerce/categories/';
  categories: any[] = []; // Déclaration de categoriesArray

  constructor(private http: HttpClient,     private categoryEventService: CategoryEventService
    ) { }


  getHeaders(): HttpHeaders | null {
    // Récupérer le token à partir du localStorage
    const token = localStorage.getItem('token');
  
    // Vérifier si le token existe
    if (!token) {
      // Si le token n'existe pas, retourner un message d'erreur
      console.error('Token utilisateur manquant');
      // Vous pouvez également utiliser un toast ou un autre mécanisme pour afficher un message à l'utilisateur
      // Retourner les en-têtes sans le token, ou null si vous souhaitez annuler la requête
      return null;
    }
    
    // Créer les en-têtes avec le token
    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }

  getCategories(): Observable<any[]> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    return this.http.get<any[]>(this.apiUrl, { headers: headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
        return throwError('Erreur lors de la récupération des catégories');
      })
    );
  }

  addCategory(categoryData: any): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    return this.http.post<any>(this.apiUrl, categoryData, { headers: headers }).pipe(
      catchError(error => {
        return throwError('Erreur lors de l\'ajout de la catégorie');
      }),
      tap(() => {
        this.categoryEventService.emitCategoryUpdated();

      })
    );
  }

  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    const url = `${this.apiUrl}${categoryId}/`;
    return this.http.put<any>(url, categoryData, { headers: headers }).pipe(
      catchError(error => {
        return throwError('Erreur lors de la mise à jour de la catégorie');
      }),
      tap(() => {
        this.categoryEventService.emitCategoryUpdated();

      })
    );
  }

  deleteCategory(categoryId: number): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
      return throwError('Headers manquants');
    }
    const url = `${this.apiUrl}${categoryId}/`;
    return this.http.delete<any>(url, { headers: headers }).pipe(
      catchError(error => {
        return throwError('Erreur lors de la suppression de la catégorie');
      }),
      tap(() => {
        this.refreshCategories();
        this.categoryEventService.emitCategoryUpdated();

      })
    );
  }

  refreshCategories() {
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
