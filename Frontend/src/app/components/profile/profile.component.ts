import { Component } from '@angular/core';
import { Login, LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoginComponent,CommonModule,LoginComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router){}

  user: any;
  profilePictureUrl: string | null = null;
  baseUrl: string = 'http://127.0.0.1:8000'; // Update with your actual base URL


   ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      if (this.user.profile_picture) {
        this.profilePictureUrl = `${this.baseUrl}${this.user.profile_picture}`;
        console.log('Profile picture URL:', this.profilePictureUrl);
      } else {
        console.log('Profile picture not found');
      }
    } else {
      console.log('User data not found');
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
