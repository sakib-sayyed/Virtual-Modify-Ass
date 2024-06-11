import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj :Login;

  constructor(private http:HttpClient,private router: Router){
    this.loginObj = new Login();
  }

  onLogin(){
    this.http.post('http://127.0.0.1:8000/login/',this.loginObj).subscribe((response:any)=>{
      if(response.access){
        alert("Login Success")
        // localStorage.setItem('mytoken',response.access);

        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        localStorage.setItem('user', JSON.stringify(response.user));
        // localStorage.setItem('profile_pic',response.user.profile_picture);
        // localStorage.setItem('username',response.user.user.username);

        this.router.navigateByUrl('/dashboard')

        // console.log(localStorage.getItem('profile_pic'))
        // console.log(localStorage.getItem('username'))
        // console.log(localStorage.getItem('user'))
      }
      else{
        alert(response.message) //||'Login Failed'
      }
      console.log(response)
      console.log(response.access)
    })
  }

  // logout() {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('refresh_token');
  //   localStorage.removeItem('user');
  //   this.router.navigate(['/login']);
  // }

}
export class Login{
  username : string;
  password : string;
  constructor(){
    this.username = '';
    this.password = '';
  }
}
