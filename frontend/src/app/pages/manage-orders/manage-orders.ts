import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

import { Order } from '../../services/order';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css',
})

export class ManageOrders implements OnInit{

  orders = signal<any[]>([]);

  constructor(private orderService: Order){}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){

    this.orderService.getAllOrders()
    .subscribe({

      next: (res: any) => {

        this.orders.set(res.data.orders);

      },

      error: (err: any) => {
        console.log(err);
      }

    });

  }

}