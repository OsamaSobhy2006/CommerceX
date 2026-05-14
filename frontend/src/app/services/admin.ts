import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  apiLink = 'http://localhost:8000/admin'

  constructor(private http: HttpClient){}

  getDashboardStats(){
    const token = localStorage.getItem('token')

    return this.http.get(
      `${this.apiLink}/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
