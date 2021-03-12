import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  constructor(private authService:UserService,private router:Router) { }
  ngOnInit(){
    this.authService.getLoggedInName.subscribe(name => this.userName = name);
    console.log( this.authService.getLoggedInName);
    
  }
  get isLoggedUser(){return this.authService.isLoggedUser()}; 
  Logout()
  {
    this.authService.Logout();
    this.router.navigate(['login']);
  }
}
