import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Cart {
  apiUrl = 'https://commercex-production.up.railway.app/cart'
  cartCount = new BehaviorSubject<number>(0)

  constructor(private http: HttpClient){}

  addToCart(productId: string, quantity: number){
    const token = localStorage.getItem('token')

    return this.http.post<any>(this.apiUrl, {
      productId,
      quantity
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((res) => {
        this.cartCount.next(res?.items?.length || 0)
      })
    );
  }

  getCart(){
    const token = localStorage.getItem('token');

    return this.http.get<any>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((res) => {
        this.cartCount.next(res?.data?.items?.length || 0)
      })
    )
  }

  removeItem(productId: string){
    const token = localStorage.getItem('token');

    return this.http.delete<any>(
      `${this.apiUrl}/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).pipe(
      tap((res) => {
        this.cartCount.next(res?.data?.items?.length || 0)
      })
    );
  }

  updateQuantity(productId: string, quantity: number){
    const token = localStorage.getItem('token');

    return this.http.patch<any>(
      this.apiUrl,
      {
        productId,
        quantity
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).pipe(
      tap((res) => {
        this.cartCount.next(res?.data?.items?.length || 0)
      })
    )
  }

  clearCart(){
    const token = localStorage.getItem('token');

    return this.http.delete<any>(
      this.apiUrl,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).pipe(
      tap(() => {
        this.cartCount.next(0)
      })
    );
  }
}