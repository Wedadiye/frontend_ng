import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.css']
})
export class DetailCartComponent {
    cartItems: any[]= [];
    totalSum: number = 0;
    checkoutDisabled: boolean = false; // Ajoutez cette propriété

    constructor(private router: Router,private CartService: CartService) {}
  
    ngOnInit(): void {

      this.CartService.getCartItems().subscribe(
        cartItems => {
          this.cartItems = cartItems;
          this.calculateTotalSum(); // Appel de la méthode pour calculer la somme totale

        },
        error => {
          console.error('Error fetching cart items:', error);
        }
      );
    }

    deleteFromCart(productId: number) {
      this.CartService.deleteFromCart(productId).subscribe(() => {
          // Mettre à jour les données du panier après la suppression côté backend
          this.refreshCart();
      });
  }
  
  refreshCart() {
      // Rafraîchir les données du panier après la suppression
      this.CartService.getCartItems().subscribe(
          cartItems => {
              this.cartItems = cartItems;
              this.calculateTotalSum();
          },
          error => {
              console.error('Error fetching cart items:', error);
          }
      );
  }
  
    updateQuantity(item: any) {
      // Mettre à jour la quantité côté backend en appelant le service approprié
      this.CartService.updateQuantity(item).subscribe(() => {
        // Mettre à jour les données du panier après la mise à jour côté backend
   
        this.calculateTotalSum();
      });
    }
  
    calculateTotalSum() {
      // Calculer la somme totale en parcourant tous les éléments du panier
      this.totalSum = this.cartItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
      }, 0);
      this.checkoutDisabled = this.totalSum === 0;
    }
    
  goToCheckout() {
      // Vérifier si la quantité commandée dépasse le stock pour chaque article
      const itemsExceedStock = this.cartItems.some(item => item.quantity > item.stock);

      if (itemsExceedStock) {
          // Afficher une alerte indiquant que la quantité commandée dépasse le stock

          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'La quantité commandée dépasse le stock disponible. Veuillez ajuster les quantités.!',
          });
          // Ne pas continuer vers la page de commande
          return;
      }

    this.router.navigate(['/home/commande']); // Redirige vers la page de commande
  }

  }
  

