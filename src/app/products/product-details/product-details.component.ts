import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!; // Get the product ID from the route
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product; // Fetch product details using the service
    });
  }
  goBackToList(): void {
    this.router.navigate(['/home/produits']); // Naviguer vers la route parente 'home/produits'

  }
}
