import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  commandes: any[] = [];

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.commandeService.getOrders().subscribe(
      (data) => {
        this.commandes = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des commandes : ', error);
      }
    );
  }
}
