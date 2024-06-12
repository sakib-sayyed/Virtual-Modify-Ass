import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css'
})
export class StorageComponent implements OnInit{

  storage: any[] = [];
  errorMessage: string = '';

  private apiUrl = 'http://127.0.0.1:8000/storage/';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchStorage();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    const csrfToken = this.getCsrfToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': csrfToken
    });
  }

  private getCsrfToken(): string {
    const csrfCookie = this.getCookie('csrftoken');
    return csrfCookie || '';
  }

  private getCookie(name: string): string | null {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || null : null;
  }

  fetchStorage(): void {
    const headers = this.getHeaders();
    this.http.get<any>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.storage = data;
        console.log(this.storage)
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Failed to load Storage. ' + error.message;
        }
      }
    });
  }
}
