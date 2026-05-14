import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = [

  {
    name: 'Clothes',
    slug: 'clothes',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    description: 'Premium fashion for every occasion',
    productsCount: 24
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    image:'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    description:'Modern devices and smart gadgets',
    productsCount: 18
  },
  {
    name: 'Sports',
    slug: 'sports',
    image:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    description: 'Everything for fitness and training',
    productsCount: 12
  }
]
}
