import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private readonly apiUrl = 'http://127.0.0.1:8000/ecommerce/produits/';

  private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public products$: Observable<any[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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