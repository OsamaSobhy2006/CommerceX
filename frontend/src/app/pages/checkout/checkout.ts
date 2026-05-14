import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Cart } from '../../services/cart';
import { Order } from '../../services/order';
import { Payment } from '../../services/payment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})

export class CheckoutPage implements OnInit {

  checkoutForm!: FormGroup;

  totalPrice = 0;

  cartId = ''

  constructor(
    private fb: FormBuilder,
    private cartService: Cart,
    private orderService: Order,
    private paymentService: Payment,
    private toast: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.getCart();

  }

  getCart(){

    this.cartService.getCart().subscribe({
      next: (res: any) => {

        this.totalPrice = res.data.totalPrice;
        this.cartId = res.data._id;

      }
    });

  }

 placeOrder(){

  if(this.checkoutForm.invalid){
    this.checkoutForm.markAllAsTouched();
    return;
  }

  const orderData = {
    shippingAddress: this.checkoutForm.value
  };

  this.orderService.createOrder(orderData)
  .subscribe({

    next: (res: any) => {

      this.toast.success(
        res.message || "Order added successfully"
      );

      this.router.navigateByUrl('/orders')
      this.checkoutForm.markAsPristine();
      this.checkoutForm.markAsUntouched();

      this.cartService.cartCount.next(0);

    },

    error: (err) => {

      this.toast.error(
        err.error.message || "Something went wrong"
      );

    }

  });

}

}