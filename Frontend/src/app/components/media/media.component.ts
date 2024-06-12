import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {

  media: any[] = [];

  pictureCount: number = 0;
  videoCount: number = 0;
  soundCount: number = 0;
  totalSize: number = 0;
  totalStorage: number = 0;
  pictureSize: number = 0;
  videoSize: number = 0;
  soundSize: number = 0;

  errorMessage: string = '';

  private apiUrl = 'http://127.0.0.1:8000/media/';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchMedia();
    this.calculateMediaStats();
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

  fetchMedia(): void {
    const headers = this.getHeaders();
    this.http.get<any>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.media = data;
        console.log(this.media) ////
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Failed to load Media. ' + error.message;
        }
      }
    });
  }
  calculateMediaStats(): void {
    this.media.forEach(m => {
      if (m.type === 'Picture') {
        this.pictureCount++;
        this.pictureSize += m.size;
      } else if (m.type === 'Video') {
        this.videoCount++;
        this.videoSize += m.size;
      } else if (m.type === 'Sound') {
        this.soundCount++;
        this.soundSize += m.size;
      }
    });
  }
}
