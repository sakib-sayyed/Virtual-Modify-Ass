import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Reactive form for Login
  loginForm : FormGroup = new FormGroup({
    username : new FormControl("",[Validators.minLength(3),Validators.required]),
    password : new FormControl("",[Validators.minLength(4),Validators.required]),
  });
  // formValue:any = this.loginForm.value;

  constructor(private api:ApiService,private router: Router){}

  Login(){
    this.api.LoginUser(this.loginForm.value).subscribe((response:any)=>{
      if(response.access){
        alert("Logdin Successfully")

        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        localStorage.setItem('profile_pic',response.user.profile_picture)
        localStorage.setItem('username',response.user.user.username);
        localStorage.setItem('userid',response.user.user.id)
        // localStorage.setItem('user', JSON.stringify(response.user));

        this.router.navigateByUrl('/dashboard')
        // console.log(localStorage.getItem('userid'))
      }
      else{
        alert(response.message) //||'Login Failed'
      }
    },error=>{
    alert('Please Correct the Username or Password')
    // console.log(error)
  })
  }
  
}



  // this.Loginobj = new Login();
  // Reactive form
  // onSave(){
  //   this.formValue = this.loginForm.value
  //   console.log(this.formValue)
  // }
  // Loginobj :Login;


// // For Login User
// export class Login{
//   username : string;
//   password : string;
//   constructor(){
//     this.username = '';
//     this.password = '';
//   }
// }