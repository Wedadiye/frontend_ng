import { Component } from '@angular/core';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { ServiceLoginService } from '../services/service-login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories: any[] = [];

  
  constructor(
    public router: Router,    private loginService: ServiceLoginService // Injectez le service ServiceLoginService
    ,private categoryService: ServiceCatagorieService,private productService: ProductService) { }
    showProductList: boolean = false;

  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
    this.getProducts();
  }
/*
  toggleProductList() {
    this.showProductList = !this.showProductList;

  }
  */
 
  getProducts(): void {
    
    this.productService.getProducts().subscribe(
      products => {
        this.productService.updateProducts(products);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }


  // Méthode pour afficher tous les produits
  showAllProducts(): void {
    this.getProducts();
  }

  toggleProductList() {

    this.showProductList = !this.showProductList;
    if (this.showProductList) {
      this.productService.getProducts().subscribe(
        products => {
          this.productService.updateProducts(products);
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }
  

  updateProductListByCategory(categoryId: number) {
    // Mettez à jour les produits en fonction de la catégorie sélectionnée
   
    this.productService.getProductsByCategory(categoryId).subscribe(
      products => {
        this.productService.updateProducts(products);
      },
      error => {
        console.error('Error fetching products by category:', error);
      }
    );
  }
  
   // Méthode pour déconnecter l'utilisateur
   logout(): void {
    this.loginService.logout().subscribe(
      () => {
        // En cas de succès, effacez le token localement, les informations de l'utilisateur et redirigez l'utilisateur vers la page de connexion
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error logging out:', error);
        // Gérez les erreurs de déconnexion ici
      }
    );
  }
}
