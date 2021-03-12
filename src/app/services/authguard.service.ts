import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{
present:boolean;
  constructor(private router : Router) { }   
  canActivate(): boolean 
  {  
    this.present= !!localStorage.getItem("username"); 
    console.log(this.present);
    if (!this.present) 
    {  
      this.router.navigateByUrl("/login");  
    }  
    return this.present; 
  }  
  /*Redirecttohome():boolean
  {
    this.present= !!localStorage.getItem("username"); 
    console.log(this.present);
    if (!this.present) 
    {  
      this.router.navigateByUrl("/home");  
    }  
    return this.present;
    
  }*/
}

