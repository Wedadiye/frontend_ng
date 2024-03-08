import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { DetailCartComponent } from './detail-cart/detail-cart.component';
import { CommandeComponent } from './commande/commande.component';
import { RegisterComponent } from './register/register.component';
import { CatagoryMenegmentComponent } from './catagory-menegment/catagory-menegment.component';
import { CatagoryAddComponent } from './catagory-add/catagory-add.component';
import { CatagoryEditComponent } from './catagory-edit/catagory-edit.component';
import { CatagoryDeleteComponent } from './catagory-delete/catagory-delete.component';
import { ProductsMenegmentComponent } from './products-menegment/products-menegment.component';
import { OrderComponent } from './order/order.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige vers /home par défaut
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },  
  {path: 'home', 
  component: HomeComponent, 
  children: [
    { path: '', redirectTo: 'produits', pathMatch: 'full' },
    { path: 'produits', component: ProductListComponent },
    { path: 'detail/:id', component: ProductDetailsComponent },
    
    { path: 'cart', component: DetailCartComponent }  ,
    { path: 'commande', component: CommandeComponent },
    { path: 'profile', component: MyprofileComponent},
  

  ]},
  { path: 'homeAdmin', 
  component: HomeAdminComponent, 
  children: [
    { path: '', redirectTo: 'catagories', pathMatch: 'full' },
    { path: 'catagories', component: CatagoryMenegmentComponent },
    { path: 'add', component: CatagoryAddComponent },
    { path: 'edit', component: CatagoryEditComponent },
    { path: 'delete', component: CatagoryDeleteComponent },
    { path: 'products', component: ProductsMenegmentComponent},
    { path: 'orders', component: OrderComponent},


  ] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
