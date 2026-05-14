import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  formData: Omit<IProduct, '_id'> = {
    name: '',
    price: 0,
    category: '',
    description: '',
    image: ''
  }
  constructor(private _productService: ProductService, private toast: ToastrService, private router: Router) {}

  onSubmit(form: NgForm) {
    this._productService.addProduct(form.value).subscribe({
      next: () => {
        this.toast.success("Product added successfully")
        form.reset()
        setTimeout(() => {
          this.router.navigateByUrl("/products")
        }, 2000)
      },
      error: (err) => {
        console.log(err)
        this.toast.error(err.error.message, "Can't add Product")
      }
    })
  }
}
