import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap/modal';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-model',
  imports: [],
  templateUrl: './delete-model.html',
  styleUrl: './delete-model.css',
  providers: [NgbModalConfig, NgbModal],
})
export class DeleteModel {
  constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
		private _productService: ProductService,
		private toast: ToastrService,
		private router: Router
	) 
  {
		config.backdrop = 'static';
		config.keyboard = false;
	}

	deleteProduct(id: string) {
		this._productService.deleteProduct(id).subscribe({
			next: () => {
				this.toast.success("Product deleted successfully")
				this.modalService.dismissAll()
				setTimeout(() => {
					this.router.navigateByUrl("/products")
				}, 2000)
			}, 
			error: (err) => this.toast.error(err.error.message)
		})
	}

	open(content: any) {
		this.modalService.open(content);
	}
	@Input()
	product!: IProduct
}
