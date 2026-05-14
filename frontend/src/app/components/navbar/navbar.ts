import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Auth } from '../../services/auth';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar implements OnInit {

  isLoggedIn = false;

  cartCount$: any;
  constructor(
    private router: Router,
    public authService: Auth,
    private cartService: Cart
  ){
    this.cartCount$ = this.cartService.cartCount;

  }
  
  ngOnInit(): void {

    this.isLoggedIn = !!localStorage.getItem('token')

    this.cartService.getCart().subscribe();

  }

  logout(){

    localStorage.removeItem('token')

    this.isLoggedIn = false

    this.cartService.cartCount.next(0)

    this.router.navigateByUrl('/login')

  }

}