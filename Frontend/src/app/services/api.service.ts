import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Loginobj = {}; //for login


  constructor(private http:HttpClient) {
    // this.Loginobj = Login; //for login
   }
  // http = inject(HttpClient)

  // Code For Provideng Authorization Header
  public token = localStorage.getItem('access_token')
  public http_header = new HttpHeaders().set("Authorization","Bearer "+this.token)
  public url = "http://127.0.0.1:8000/"

  LoginUser(user:FormData){
    return this.http.post(this.url + "login/", user)
  }
  RegisterUser(user:FormData) : Observable<any> {
    console.log(user)
    return this.http.post(this.url + "register/", user)
  }
  getProjects(){
    return this.http.get(this.url + "projects/", {headers:this.http_header});
  }
  getMedia(){
    return this.http.get(this.url + "media/", {headers:this.http_header})
  }
  private userID = localStorage.getItem('userid')
  getProfile(){
    return this.http.get(this.url+"userprofiles/"+this.userID+'/', {headers:this.http_header})
  }

  
  // getProjects(){
  //   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MzY2NDgwLCJpYXQiOjE3MTgzNjM0ODAsImp0aSI6Ijg4YTk5NTIzNjczNjQ5Nzk5ZGM3YzM0ZTdmZjU2OWViIiwidXNlcl9pZCI6MX0.EkCmqQTcPQIgVEeKa5J3LLva4kxoB8Stb-MpFSomobU"
  //   let htt_pheader = new HttpHeaders().set("Authorization","Bearer "+token)
    
  //   return this.http.get("http://127.0.0.1:8000/projects/",{headers:http_header});
  // }

  // getProjects(){
  //   return this.http.get("http://127.0.0.1:8000/projects/")
  // }





  // private url = environment.apiUrl; // Base URL of your API
  // private http_header = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  // });
}
//Login Object
// export class Login{
//   username : string;
//   password : string;
//   constructor(){
//     this.username = '';
//     this.password = '';
//   }
// }