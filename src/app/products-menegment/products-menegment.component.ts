import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-products-menegment',
  templateUrl: './products-menegment.component.html',
  styleUrls: ['./products-menegment.component.css']
})
export class ProductsMenegmentComponent implements OnInit{

  products: any[] = [];
  
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  
  openAddDialog() {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }
  
  openEditDialog(product: any) {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '300px',
      data: product
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadProducts();
      }
    });
  }
  
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts();
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 2000,
        });
      }, error => {
        console.error('Error deleting product:', error);
        this.snackBar.open('Error deleting product', 'Close', {
          duration: 2000,
        });
      });
    }
  }
}
