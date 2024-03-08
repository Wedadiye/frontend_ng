import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { DetailCartComponent } from './detail-cart/detail-cart.component';
import { CommandeComponent } from './commande/commande.component';
import { RegisterComponent } from './register/register.component';
import { ProductsMenegmentComponent } from './products-menegment/products-menegment.component';
import { CatagoryMenegmentComponent } from './catagory-menegment/catagory-menegment.component';
import { CatagoryAddComponent } from './catagory-add/catagory-add.component';
import { CatagoryEditComponent } from './catagory-edit/catagory-edit.component';
import { CatagoryDeleteComponent } from './catagory-delete/catagory-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component'; // Import de MatTableModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProductsModule } from './products/product.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeAdminComponent,
    DetailCartComponent,
    CommandeComponent,
    RegisterComponent,
    ProductsMenegmentComponent,
    CatagoryMenegmentComponent,
    CatagoryAddComponent,
    CatagoryEditComponent,
    CatagoryDeleteComponent,
    ProductAddComponent,
    ProductEditComponent,
    OrderComponent,
    MyprofileComponent
  ],
  imports: [
    ProductsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
