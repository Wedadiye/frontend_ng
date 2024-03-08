import { Component, OnInit } from '@angular/core';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-catagory-add',
  templateUrl: './catagory-add.component.html',
  styleUrls: ['./catagory-add.component.css']
})
export class CatagoryAddComponent  {
  categoryData: any = {
    name: '',
    description: ''
  };

  constructor(private categoryService: ServiceCatagorieService, public dialogRef: MatDialogRef<CatagoryAddComponent>) { }


  addCategory() {
    this.categoryService.addCategory(this.categoryData).subscribe(
      (response) => {
        console.log('Catégorie ajoutée avec succès', response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la catégorie', error);
        // Gérer l'erreur ici
      }
    );
  }

}
