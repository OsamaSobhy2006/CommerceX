import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})

export class Filter {

  @Input() 
  selectedCategory: string = '';

  @Output()
  categoryChanged = new EventEmitter<string>();


  onCategoryChange(){
    this.categoryChanged.emit(
      this.selectedCategory
    );

  }

}