import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  constructor(private formBuilder: FormBuilder, private route: Router, public service: UserService) { }
loggedIn:boolean;
  ngOnInit(): void {
    this.loggedIn= !!localStorage.getItem("username"); 
    console.log(this.loggedIn);
    if (this.loggedIn) 
    {  
      this.route.navigateByUrl("/home");  
    }  
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Password: ['', [Validators.required]]
    });
  }
  submitted: boolean;
  errorpresent: boolean;
  get f() { return this.loginForm.controls; }
  validateForm() {
    this.errorpresent = false;
    var email = this.loginForm.get('Email').value;
    var password = this.loginForm.get('Password').value;
      if (email = null || email.length < 1) {
        document.getElementById('error-email').innerHTML = " Please Enter Your email *";
        this.errorpresent = true;
      }
      else{
        document.getElementById('error-email').innerHTML = "";
      }
      console.log(password);
      if (password = null || password.length < 1) {
        document.getElementById('error-password').innerHTML = " Please Enter Your password *";
        this.errorpresent = true;
      }
      else{
        document.getElementById('error-password').innerHTML = "";
      }
    if (this.errorpresent == false) {
      
      this.doLogin();  
    }

  }
  doLogin() {
    if(this.loginForm.invalid){
      document.getElementById('error-message').innerHTML ="Please enter all required details";
      return;}
    this.submitted = true;
    this.service.doLogin(this.loginForm.value).subscribe(result => {
      localStorage.setItem('username',result.FirstName+" "+result.LastName);
      localStorage.setItem('userPass',result.Password);
      this.route.navigate(["home"]);

    }, (error) => {
      console.log(error);
      document.getElementById('error-message').innerHTML = "Email Id or Password is wrong!!";
    });

}
}
