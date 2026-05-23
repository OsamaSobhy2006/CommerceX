import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';

import { Order } from '../../services/order';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})

export class OrderDetails implements OnInit{

  order = signal<any>(null);

  constructor(
    private route: ActivatedRoute,
    private orderService: Order
  ){}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(id){

      this.orderService.getOrderById(id)
      .subscribe({

        next: (res: any) => {

          this.order.set(res.data.order);

        },

        error: (err: any) => {
          console.log(err);
        }

      });

    }

  }

}