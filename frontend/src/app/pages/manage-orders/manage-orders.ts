import { Component, OnInit } from '@angular/core';
import { Order } from '../../services/order';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-manage-orders',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css',
})
export class ManageOrders implements OnInit{
  orders: any[] = []
  constructor(private orderService: Order){}
  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.orderService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data.orders
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
