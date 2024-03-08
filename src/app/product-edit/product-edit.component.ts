

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../products/product.service';
import { ServiceCatagorieService } from '../services/service-catagorie.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  imageSrc: string | null = null;

  editProductForm: FormGroup;
  categories: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private categoryService: ServiceCatagorieService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.editProductForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      description: [data.description],
      price: [data.price, Validators.required],
      stock: [data.stock, Validators.required],
      category: [data.category ? data.category : null, Validators.required], // Assurez-vous que data.category contient l'objet catégorie complet
      image:  [data.image] // Assurez-vous que data.image contient l'URL ou le nom de l'image actuelle du produit
    
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
  onSubmit() {
    if (this.editProductForm.valid) {
      const productId = this.editProductForm.value.id;
      const formData = new FormData();
      formData.append('id', this.editProductForm.value.id);
      formData.append('name', this.editProductForm.value.name);
      formData.append('description', this.editProductForm.value.description);
      formData.append('price', this.editProductForm.value.price);
      formData.append('stock', this.editProductForm.value.stock);
      
      // Vérifiez si la catégorie a été modifiée
      const currentCategoryId = this.editProductForm.value.category;
      const originalCategoryId = this.data.category ? this.data.category.id : null;
      if (currentCategoryId !== originalCategoryId) {
        formData.append('category', currentCategoryId);
      }
  
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
  
      this.productService.updateProduct(productId, formData).subscribe(
        () => {
          this.snackBar.open('Product updated successfully', 'Close', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error updating product:', error);
          this.snackBar.open('Error updating product', 'Close', { duration: 2000 });
        }
      );
    }
  }
  /*
  onSubmit() {
    if (this.editProductForm.valid) {
      
      const productId = this.editProductForm.value.id; // Récupérer l'ID du produit à partir du formulaire
      const formData = new FormData();
      formData.append('id', this.editProductForm.value.id);
      formData.append('name', this.editProductForm.value.name);
      formData.append('description', this.editProductForm.value.description);
      formData.append('price', this.editProductForm.value.price);
      formData.append('stock', this.editProductForm.value.stock);
      formData.append('category', this.editProductForm.value.category);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.productService.updateProduct(productId,formData).subscribe(
        () => {
          this.snackBar.open('Product updated successfully', 'Close', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error updating product:', error);
          this.snackBar.open('Error updating product', 'Close', { duration: 2000 });
        }
      );
    }
  }
*/

onFileSelected(event: any) {
  const files = event.target.files;
  if (files.length > 0) {
    this.selectedFile = files[0]; // Stockez le fichier sélectionné dans this.selectedFile
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result; // Mettez à jour l'URL de l'image dans la variable de composant
    };
    reader.readAsDataURL(files[0]); // Convertit le fichier en URL base64
  }
}

  onCancel() {
    this.dialogRef.close(false);
  }
  
  
}
