import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Admin } from '../../services/admin';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, CurrencyPipe],
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit{
  stats: any;

  constructor(private adminService: Admin){}

  ngOnInit(): void {
    this.getStats()
  }

  getStats(){
    this.adminService.getDashboardStats().subscribe({
      next: (res: any) => {
        this.stats = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
