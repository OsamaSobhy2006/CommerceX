import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  imports: [NgbPagination],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})

export class Pagination {
  @Input()
  page: number = 1;

  @Input()
  collectionSize: number = 0;

  @Output()
  pageChange = new EventEmitter<number>();
}