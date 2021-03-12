import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardloginpageService implements CanActivate{
present:boolean;
  constructor(private router : Router) { }   
  canActivate(): boolean 
  {  
    this.present= !!localStorage.getItem("username"); 
    console.log(this.present);
    if (this.present) 
    {  
      this.router.navigateByUrl("/home");  
    }  
    else{
      this.router.navigateByUrl("/login");
    }
    return this.present; 
  }  
 
}

