import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Order {

  apiUrl = 'https://commerce-x-zabs.vercel.app/orders';

  constructor(private http: HttpClient) {}

  createOrder(data: any){

    const token = localStorage.getItem('token');

    return this.http.post(
      this.apiUrl,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getMyOrders(){
  const token = localStorage.getItem('token');
  return this.http.get(
    `${this.apiUrl}/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

  deleteOrder(id: string){

  const token = localStorage.getItem('token');

  return this.http.delete(
    `${this.apiUrl}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}

  getAllOrders(){
    const token = localStorage.getItem('token')

    return this.http.get(this.apiUrl, {
      headers: {
        Authorization: `Barear ${token}`
      }
    })
  }

  getOrderById(id: string){
    const token = localStorage.getItem('token')

    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}