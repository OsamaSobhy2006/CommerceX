import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}
  apiLink = `https://commerce-x-zabs.vercel.app/products`


  getProducts(query: string = ''){
    return this._http.get(`${this.apiLink}?${query}`)
  }

  getOneProduct(id: string){
    return this._http.get(`${this.apiLink}/${id}`)
  }

  addProduct(product:Omit<IProduct, "_id">){
    return this._http.post(this.apiLink, product)
  }

  updateProduct(id: string, product: Partial<IProduct>){
    return this._http.patch(`${this.apiLink}/${id}`, product)
  }

  deleteProduct(id: string){
    return this._http.delete(`${this.apiLink}/${id}`)
  }
}
