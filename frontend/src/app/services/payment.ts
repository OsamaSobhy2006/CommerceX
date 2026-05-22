import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Payment {

  apiUrl = 'https://commercex-production.up.railway.app/payment';

  constructor(private http: HttpClient) {}

  checkout(orderId: string){

    const token = localStorage.getItem('token');

    return this.http.post(
      `${this.apiUrl}/checkout/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  }

}