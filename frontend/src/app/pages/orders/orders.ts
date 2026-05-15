import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Order } from '../../services/order';
import { Payment } from '../../services/payment';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})

export class OrdersPage implements OnInit {

  orders = signal<any[]>([]);

  constructor(
    private orderService: Order,
    private paymentService: Payment
  ){}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){

    this.orderService.getMyOrders()
    .subscribe({

      next: (res: any) => {

        console.log(res);

        this.orders.set(res.data.order);

      },

      error: (err: any) => {
        console.log(err);
      }

    });

  }

  payNow(orderId: string){

    this.paymentService.checkout(orderId)
    .subscribe({

      next: (res: any) => {
        window.location.href = res.url;
      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  deleteOrder(id: string){

    this.orderService.deleteOrder(id)
    .subscribe({

      next: () => {

        this.orders.update((orders) =>
          orders.filter(
            (order: any) => order._id !== id
          )
        );

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

}