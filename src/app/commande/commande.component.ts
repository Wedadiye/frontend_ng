
// command.component.ts

import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommandeService } from '../services/commande.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
  address: string = ''; // Variable pour stocker l'adresse de livraison
  pays: string = ''; // Variable pour stocker l'adresse de livraison

  cardNumber: string = ''; // Variable pour stocker le numéro de carte
  expiryDate: string = ''; // Variable pour stocker la date d'expiration
  cartItems: any[] = []; // Variable pour stocker les produits du panier
  totalSum: number = 0; // Variable pour stocker la somme totale du panier


  
    constructor(private cartService: CartService,
      private router :Router, 
      private CommandeService: CommandeService) { }
  
    ngOnInit(): void {
      // Appelez une méthode du service de panier pour récupérer les éléments du panier
      this.cartService.getCartItems().subscribe(
        (data) => {
          this.cartItems = data; // Mettez à jour la liste des articles du panier
          this.calculateTotalSum(); // Calculez la somme totale
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des articles du panier :', error);
        }
      );
    }
  
    submitOrder(): void {
      // Créez un objet pour représenter la commande à envoyer au backend
      const orderData = {
        address: this.address,
        pays:this.pays,
        total: this.totalSum,
        products: this.cartItems.map(item => ({ product: item.product_id, quantity: item.quantity }))
      };
  
      // Appelez une méthode du service de commande pour soumettre la commande
      this.CommandeService.submitOrder(orderData).subscribe(
        (response) => {
          console.log('Commande soumise avec succès !', response);
          // Affichez une alerte de succès ou effectuez toute autre action nécessaire
          Swal.fire({
            icon: 'success',
            title: 'Merci!',
            text: 'Commande soumise avec succès !',
          });  
       
          this.clearCart();

        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la soumission de la commande :', error);
          // Affichez une alerte d'erreur ou effectuez toute autre action nécessaire
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Remplir tous les champs svp!',
          });
        }
      );
    }
  
  
  calculateTotalSum(): void {
    // Calculer la somme totale en parcourant tous les éléments du panier
    this.totalSum = this.cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
  }
  
  clearCart(): void {
    // Appelez une méthode du service de panier pour vider le panier
    this.cartService.clearCart().subscribe(
      () => {
        console.log('Panier vidé avec succès !');
        // Affichez une alerte ou effectuez toute autre action nécessaire pour indiquer que le panier a été vidé avec succès
/*
        Swal.fire({
          icon: 'success',
          title: 'Merci!',
          text: 'Le panier a été vidé avec succès ! !',
        });  
     
*/
        this.router.navigate(['/home/produits']); // Redirection vers la page de connexion


      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression des articles du panier :', error);
        // Affichez une alerte d'erreur ou effectuez toute autre action nécessaire
        alert('Une erreur s\'est produite lors de la suppression des articles du panier. Veuillez réessayer.');
      }
    );
  }
}


