import { Component, OnInit } from '@angular/core';
import { Order } from '../../services/order';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CurrencyPipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit{
  order: any
  constructor(private route: ActivatedRoute, private orderService: Order){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.orderService.getOrderById(id).subscribe({
        next: (res: any) => {
          this.order = res.data.order
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
}
