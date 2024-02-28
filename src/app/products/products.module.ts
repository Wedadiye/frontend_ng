import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  
  exports: [ProductListComponent] ,// 
  imports: [
    CommonModule,
    
    RouterModule.forChild([
      { path: 'produits', component: ProductListComponent },
      { path: 'produits/:id', component: ProductDetailsComponent } // Ajout du chemin pour les détails du produit

    ])
  ]
})
export class ProductsModule { }
