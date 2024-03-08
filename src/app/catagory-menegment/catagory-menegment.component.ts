import { Component, OnInit } from '@angular/core';
import { ServiceCatagorieService } from '../services/service-catagorie.service';
import { CatagoryAddComponent } from '../catagory-add/catagory-add.component';
import { CatagoryEditComponent } from '../catagory-edit/catagory-edit.component';
import { CatagoryDeleteComponent } from '../catagory-delete/catagory-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEventService } from '../services/category-event.service';

@Component({
  selector: 'app-catagory-menegment',
  templateUrl: './catagory-menegment.component.html',
  styleUrls: ['./catagory-menegment.component.css']
})
export class CatagoryMenegmentComponent implements OnInit {
  
  
  categories: any[]  = [];
  
    constructor(
      private categoryService: ServiceCatagorieService, 
      public dialog: MatDialog,   
       private categoryEventService: CategoryEventService,
      ) { }
  
    ngOnInit(): void {
      this.loadCategories();
      this.subscribeToCategoryUpdates();

    }
  
    subscribeToCategoryUpdates() {
      this.categoryEventService.categoryUpdated$.subscribe(() => {
        this.loadCategories();
      });
    }
    loadCategories() {
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories;
      });
    }
  
    openAddDialog() {
      const dialogRef = this.dialog.open(CatagoryAddComponent, {
      width: '300px',
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          // Logique pour ajouter la catégorie
        }
      });
    }
  
    openEditDialog(category: any) {
      const dialogRef = this.dialog.open(CatagoryEditComponent, {
        width: '300px',
        data: category
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          // Logique pour modifier la catégorie
        }
      });
    }
  
    openDeleteDialog(category: any) {
      const dialogRef = this.dialog.open(CatagoryDeleteComponent, {
        width: '300px',
        data: category
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          // Logique pour supprimer la catégorie
        }
      });
    }
  
  }
  

