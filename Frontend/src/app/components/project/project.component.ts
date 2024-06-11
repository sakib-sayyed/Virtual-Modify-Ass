import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

  projects: any[] = [];
  errorMessage: string = '';

  private apiUrl = 'http://127.0.0.1:8000/projects/';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProjects();
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

  fetchProjects(): void {
    const headers = this.getHeaders();
    this.http.get<any>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.projects = data;
        console.log(this.projects)
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Failed to load projects. ' + error.message;
        }
      }
    });
  }
}
