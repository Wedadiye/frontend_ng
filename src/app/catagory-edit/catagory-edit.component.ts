import { Component, Inject, OnInit } from '@angular/core';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-catagory-edit',
  templateUrl: './catagory-edit.component.html',
  styleUrls: ['./catagory-edit.component.css']
})
export class CatagoryEditComponent {
  
  constructor(private categoryService: ServiceCatagorieService,
     public dialogRef: MatDialogRef<CatagoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

updateCategory() {
this.categoryService.updateCategory(this.data.id, this.data).subscribe(
(response) => {
console.log('Catégorie mise à jour avec succès', response);
this.dialogRef.close(true);
},
(error) => {
console.error('Erreur lors de la mise à jour de la catégorie', error);
// Gérer l'erreur ici
}
);
}
}
