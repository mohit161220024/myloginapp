import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
user:any;
constructor(private authService:UserService,private router:Router) { }
  ngOnInit(): void {
    this.user=localStorage.getItem('username');
    console.log(this.user);
    this.authService.getLoggedInName.subscribe(name => this.user = name);
    console.log( this.authService.getLoggedInName);
  }
  get isLoggedUser(){return this.authService.isLoggedUser()}; 
  Logout()
  {
    this.authService.Logout();
    this.router.navigate(['login']);
  }

}
