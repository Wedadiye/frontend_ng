/*
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  formData: any = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: null,
    image: null  // Ajout de la propriété pour stocker l'image
  };
  categories: any[] = [];
  title: string = 'Add Product';
  action: string = 'Add';

  constructor(
    private productService: ProductService,
    private categoryService: ServiceCatagorieService,
    public dialogRef: MatDialogRef<ProductAddComponent>,
    private snackBar: MatSnackBar
  ) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.image = file;
    }
  }

  onSubmitClick() {
    this.productService.addProduct(this.formData).subscribe(
      
      (response) => {
        console.log('Catégorie ajoutée avec succès', response);
      this.dialogRef.close(true);
      this.snackBar.open('Product added successfully', 'Close', { duration: 2000 });
    }, error => {
      console.error('Error adding product:', error);
      this.snackBar.open('Error adding product', 'Close', { duration: 2000 });
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
*/

import { ProductService } from '../products/product.service';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

export class ProductAddComponent implements OnInit {

    addProductForm: FormGroup; // Déclaration de addProductForm

    categories: any[] = [];
    selectedFile: File | null = null;
  
    constructor(
      private formBuilder: FormBuilder,
      private productService: ProductService,
      private categoryService: ServiceCatagorieService,
      private dialogRef: MatDialogRef<ProductAddComponent>,
      private snackBar: MatSnackBar
    ) {
      this.addProductForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        price: ['', Validators.required],
        stock: ['', Validators.required],
        category: ['', Validators.required],
        image: ['']
      });
    }
  
    ngOnInit(): void {
      this.loadCategories();
    }
  
    loadCategories() {
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories;
      });
    }
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
    onSubmit() {
      if (this.addProductForm.valid) {
        const formData = new FormData();
        formData.append('name', this.addProductForm.value.name);
        formData.append('description', this.addProductForm.value.description);
        formData.append('price', this.addProductForm.value.price);
        formData.append('stock', this.addProductForm.value.stock);
        formData.append('category', this.addProductForm.value.category);
        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }
  
        this.productService.addProduct(formData).subscribe(
          () => {
            this.snackBar.open('Product added successfully', 'Close', { duration: 2000 });
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error adding product:', error);
            this.snackBar.open('Error adding product', 'Close', { duration: 2000 });
          }
        );
      }
    }
  
    onCancel() {
      this.dialogRef.close(false);
    }
  
  }
  


