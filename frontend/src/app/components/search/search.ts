import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchTerm = ''

  @Output()
  searchChanged = new EventEmitter<string>()

  onSearch(){
    this.searchChanged.emit(this.searchTerm);
  }
}
