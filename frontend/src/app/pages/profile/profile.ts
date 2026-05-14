import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  constructor(public authService: Auth){}
}
