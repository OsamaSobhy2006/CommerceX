import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';

import { Admin } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})

export class AdminDashboard implements OnInit{

  stats = signal<any>(null);

  constructor(private adminService: Admin){}

  ngOnInit(): void {
    this.getStats();
  }

  getStats(){

    this.adminService.getDashboardStats()
    .subscribe({

      next: (res: any) => {

        this.stats.set(res.data);

      },

      error: (err) => {
        console.log(err.error.message);
      }

    });

  }

}