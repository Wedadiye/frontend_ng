import { Component, Inject, OnInit } from '@angular/core';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-catagory-delete',
  templateUrl: './catagory-delete.component.html',
  styleUrls: ['./catagory-delete.component.css']
})
export class CatagoryDeleteComponent {

  constructor(private categoryService: ServiceCatagorieService, public dialogRef: MatDialogRef<CatagoryDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



deleteCategory() {
this.categoryService.deleteCategory(this.data.id).subscribe(
(response) => {
console.log('Catégorie supprimée avec succès', response);
//this.categoryService.refreshCategories(); // Appeler la méthode pour rafraîchir les catégories

this.dialogRef.close(true);
},
(error) => {
console.error('Erreur lors de la suppression de la catégorie', error);
// Gérer l'erreur ici
}
);
}
}
