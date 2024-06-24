import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  username = localStorage.getItem('username')
  profile_pic = localStorage.getItem('profile_pic')
  profile_pic_url = "http://127.0.0.1:8000/"+ this.profile_pic 


  constructor(private router:Router){}

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_pic');
    this.router.navigate(['/login']);
  }

}
