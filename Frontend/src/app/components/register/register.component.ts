import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private api:ApiService ,private router:Router){
    
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.minLength(3), Validators.required]),
      password: new FormControl("", [Validators.minLength(4), Validators.required]),
      profile_picture: new FormControl(null)
    });
  }

  registerUser(){
    const formData = new FormData();
    formData.append('user.username', this.registerForm.get('username')?.value);
    formData.append('user.password', this.registerForm.get('password')?.value);

    const profilePictureFile = this.registerForm.get('profile_picture')?.value;
    if (profilePictureFile) {
      formData.append('profile_picture', profilePictureFile, profilePictureFile.name);
    }

   // Api Calling Here
    this.api.RegisterUser(formData).subscribe((response:any) =>{
      if (response.access){
        alert("Register Succesfull..")
        this.router.navigateByUrl('/login')
      }
      else{
        alert(response.message)
      }
    },error=>{
      alert('Something Wrong !');
      // console.log(error)
  })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.registerForm.patchValue({
      profile_picture: file
    });
    this.registerForm.get('profile_picture')?.updateValueAndValidity();
  }
}
