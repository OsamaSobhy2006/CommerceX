import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Highlight } from "../../directive/highlight";
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CommonModule, Highlight, TruncatePipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input()
  product!: any

  @Input()
  productDetails!: Boolean

}
