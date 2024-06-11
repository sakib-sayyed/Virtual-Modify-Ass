import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  profile_picture: File | null = null;
  errorMessage = '';

  private registerUrl = 'http://127.0.0.1:8000/register/';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.profile_picture = event.target.files[0];
    }
  }

  register() {
    if (this.username && this.password && this.profile_picture) {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('profile_picture', this.profile_picture);

      this.http.post<any>(this.registerUrl, formData).subscribe({
        next: response => {
          if (response.access && response.refresh) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/profile']); // Navigate to profile or dashboard on success
          }
        },
        error: err => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'All fields are required.';
    }
  }
}
