import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = { 
  headers: new HttpHeaders
    ({
      'Content-Type': 'application/json'
    })
  }
  public getLoggedInName = new Subject();         
  constructor(private http:HttpClient) {
    this.getLoggedInName.next(sessionStorage.getItem('username'))
   }
  baseUrl : string = "https://localhost:44306/api/accounts";
  addUser(user){
    return this.http.post<any>(this.baseUrl+"/createuser",JSON.stringify(user),this.httpOptions);
  }
  
  API_URI = 'https://localhost:44306/api/accounts';
  doLogin(data) {
    console.log(data);
    return this.http.post<User>(this.API_URI+"/userlogin", data);  
  }
  isLoggedUser() {
    if (localStorage.getItem('username')) {
      return true;
    }
    return false;
  }
  Logout()
  {
    console.log("in method");
    if (!!localStorage.getItem('username'))
    {
      localStorage.removeItem('username');
    }   
  }
 
    }

