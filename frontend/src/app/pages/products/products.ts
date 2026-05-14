import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Card } from '../../components/card/card';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Highlight } from "../../directive/highlight";
import { FormsModule } from '@angular/forms';
import { Filter } from '../../components/filter/filter';
import { Sort } from "../../components/sort/sort";
import { Pagination } from '../../components/pagination/pagination';
import { Search } from '../../components/search/search';

@Component({
  selector: 'app-products',
  imports: [Card, RouterLink, Highlight, FormsModule, Filter, Sort, Pagination, Search],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: any = [];
  page: number = 1
  collectionSize: number = 0;
  selectedCategory: string = '';
  sortValue: string = ''
  searchTerm: string = ''
  constructor(
    private _productService: ProductService,
    private chd: ChangeDetectorRef,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.router.queryParams.subscribe(params => {
    const category = params['category'];
    this.selectedCategory = category || ''
    this.loadProduct();
  });
}

  loadProduct(){
    let query = `page=${this.page}&limit=12`;
    if(this.selectedCategory){
      query += `&category=${this.selectedCategory}`;
    }
    if(this.sortValue){
      query += `&sort=${this.sortValue}`;
    }
    if(this.searchTerm){
      query += `&search=${this.searchTerm}`;
    }
    this._productService.getProducts(query).subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.collectionSize = res.totalProducts;
        this.chd.detectChanges();
      }
    })
}

  onCategoryChange(category: string){
  this.selectedCategory = category;
  this.loadProduct();
}

  onSortChange(sort: string){
  this.sortValue = sort;
  this.loadProduct();
}

  onPageChange(page: number){
  this.page = page;
  this.loadProduct();
}

onSearchChange(search: string){
  this.searchTerm = search
  this.page = 1
  this.loadProduct()
}

}
