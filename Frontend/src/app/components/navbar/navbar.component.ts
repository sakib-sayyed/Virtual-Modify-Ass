import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  username: string | null = null;
  profile_pic:string | null = null;

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const profile_pic = localStorage.getItem('profile_pic')
    if (user) {
      const userData = JSON.parse(user);
      this.username = userData.user.username;
      this.profile_pic = userData.user.profile_pic
    }
  }

}
