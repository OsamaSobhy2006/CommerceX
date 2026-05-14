import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { IProduct } from '../../models/iproduct';
import { map, Observable, tap } from 'rxjs';
import { Card } from '../../components/card/card';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { DeleteModel } from "../../components/delete-model/delete-model";
import { Highlight } from "../../directive/highlight";
import { Auth } from '../../services/auth';
import { Cart } from '../../services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [Card, AsyncPipe, RouterLink, CurrencyPipe, DeleteModel, Highlight],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  id = ""
  count = 1
  Math = Math
  productRating = 4.9;
  reviewsCount = 89;
  reviews = [
  {
    user: 'Emily R.',
    rating: 5,
    comment: 'This is the softest sweater I own. The cashmere is incredibly high quality and it washes beautifully.',
    date: 'Jan 18, 2032',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },

  {
    user: 'Ahmed Ali',
    rating: 4,
    comment: 'Amazing quality and very comfortable.',
    date: 'Feb 10, 2032',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },

  {
    user: 'Mona Sara',
    rating: 5,
    comment: 'Worth every penny honestly.',
    date: 'March 2, 2032',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];
  product!: Observable<IProduct>
  productDetails = true
  constructor(private router: ActivatedRoute, private _productService: ProductService, public authService: Auth, private cartService: Cart, private toast: ToastrService, private route: Router) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (data: any) => {
        this.id = data.params.id
        this.product = this._productService.getOneProduct(this.id).pipe(
          map((res: any) => res)
        )
      }
    })
  }

  increment(): void{
    this.count++
  }
  
  decrement():void {
    if(this.count > 1)
      this.count--
  }

  addProductToCart(productId: string){
  this.cartService.addToCart(productId, this.count).subscribe({
    next: () => {
      this.toast.success('Product added to cart');
      this.cartService.getCart().subscribe();
    },
    error: () => {
      this.toast.error('you should to login first');
      this.route.navigateByUrl('/login')
    }
  });
}
}
