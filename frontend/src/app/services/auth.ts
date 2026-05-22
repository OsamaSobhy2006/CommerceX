import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  apiLink = 'https://commercex-production.up.railway.app/auth'
  currentUser: any = null;

  constructor(private _http: HttpClient) {}

  signUp(UserData: object){
    return this._http.post(`${this.apiLink}/signup`, UserData)
  }

  login(UserData: object){
    return this._http.post(`${this.apiLink}/login`, UserData)
  }

  verifyOtp(data: object){
    return this._http.post(`${this.apiLink}/confirm-email`, data)
  }

  forgetPassword(data: object){
    return this._http.post(`${this.apiLink}/forget-password`,data);
  }

  resetPassword(token: string, data: object){
    return this._http.post(`${this.apiLink}/reset-password/${token}`, data)
  }

  saveCurrentUser(){
    const token = localStorage.getItem('token')
    if(token)
      this.currentUser = jwtDecode(token)
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}
