import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
user:any;
  constructor(public route:Router,private authService:UserService) { }

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
    this.route.navigate(['login']);
  }
}

