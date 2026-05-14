import { Component, OnInit } from '@angular/core';
import { Cart as CartService } from '../../services/cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})

export class CartPage implements OnInit {
  cart: any = {
    items: [], 
    totalPrice: 0
  };
  constructor(private cartService: CartService){}
  
  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cart = res.data;
      }
    });
  }

  increaseQuantity(productId: string, quantity: number){
    this.cartService.updateQuantity(
      productId,
      quantity + 1
    ).subscribe(() => {
      this.getCart();
    });
  }

  decreaseQuantity(productId: string, quantity: number){
    if(quantity <= 1) return;
    this.cartService.updateQuantity(
      productId,
      quantity - 1
    ).subscribe(() => {
      this.getCart();
    });
  }

  removeItem(productId: string){
    this.cartService.removeItem(productId)
    .subscribe(() => {
      this.getCart();
    });
  }
}