import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MediaComponent } from '../media/media.component';
import { ProjectComponent } from '../project/project.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarComponent,MediaComponent,ProjectComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  projects: any[] = [];
  errorMessage: string = '';
  totalMemoryUsage: number = 0;

  icon_list = [ 
    'bi bi-asterisk p-icon',
    'bi bi-stars p-icon',
    'bi bi-brightness-low-fill p-icon',
    'bi bi-boxes p-icon',
  ]

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
        this.calculateTotalMemoryUsage()
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
  calculateTotalMemoryUsage(): void {
    this.totalMemoryUsage = this.projects.reduce((total, project) => total + project.memory_usage, 0);
  }
}