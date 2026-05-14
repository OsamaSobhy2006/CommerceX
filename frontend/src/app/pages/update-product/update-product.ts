import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit{
  UpdateProduct!: FormGroup
  id = ""
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _productService: ProductService, private toast: ToastrService, private router: Router) {}
  ngOnInit(): void {
    this.UpdateProduct = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
    })
    this.route.paramMap.subscribe({
      next: (res: any) => {
        this.id = res.params.id 
        this._productService.getOneProduct(this.id).subscribe({
          next: (res) => this.UpdateProduct.patchValue(res)
        })
      }
    })
  }

  checkInput(control: string){
    return (this.UpdateProduct.get(control)?.errors && (this.UpdateProduct.get(control)?.touched || this.UpdateProduct.get(control)?.dirty))
  }

  onSubmit() {
    this._productService.updateProduct(this.id, this.UpdateProduct.value).subscribe({
      next: (res) => {
        this.toast.success("Product Updated Successfully")
        this.router.navigateByUrl("/products")
      },
      error: (err) => {
        this.toast.error(err.error.message, ("Can't update product"))
      }
    })
  }
}
