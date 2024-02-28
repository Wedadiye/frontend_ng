import { Component } from '@angular/core';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { Router } from '@angular/router';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories: any[] = [];

  
  constructor(
    public router: Router,private categoryService: ServiceCatagorieService,private productService: ProductService) { }
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
  }
/*
  toggleProductList() {
    this.showProductList = !this.showProductList;

  }
  */
 
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
}
