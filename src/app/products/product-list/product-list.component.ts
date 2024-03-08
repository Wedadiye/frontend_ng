
// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '.././../services/cart.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  cartItems: {[productId: number]: number} = {}; // Structure pour stocker la quantité de chaque produit ajoutée au panier

  constructor(private route: ActivatedRoute,
    private router: Router,private productService: ProductService,
    private CartService: CartService) { }
  
    productDetails(id: number) {
      this.router.navigate(['../detail', id], { relativeTo: this.route }); // Utilisez une navigation relative
    
  }
  
  
      
  addToCart(productId: number) {

      this.CartService.addToCart(productId).subscribe(
      
        (response: any) => { // Gestion de la réponse réussie
          console.log('Product added to cart successfully:', response);

        },
        (error: any) => { // Gestion de l'erreur
          console.error('Error adding product to cart:', error);
        }
      );
    }
   

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.products = products;
      
      // Ajouter une propriété 'clicked' à chaque produit pour suivre le nombre de clics
    });
  }
  
}
