import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../../services/order';
import { RouterLink } from '@angular/router';
import { Payment } from '../../services/payment';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})

export class OrdersPage implements OnInit {
  orders: any[] = [];
  constructor(private orderService: Order, private paymentService: Payment){}
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getMyOrders()
    .subscribe({
      next: (res: any) => {
        this.orders = res.data.order;
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

      this.orders = this.orders.filter(
        (order: any) => order._id !== id
      );

    }
  })

}
}