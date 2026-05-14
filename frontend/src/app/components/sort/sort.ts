import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort',
  imports: [FormsModule],
  templateUrl: './sort.html',
  styleUrl: './sort.css',
})
export class Sort {
  sortValue: string = '';

  @Output()
  sortChanges = new EventEmitter<string>()

  onSortChange(){
    this.sortChanges.emit(this.sortValue)
  }
}
