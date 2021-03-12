import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  todayShort = new Date().toISOString().slice(0, 10);
  maxDate=new Date("1900-01-01").toISOString().slice(0, 10);;
  addUser: FormGroup
  
  constructor(private builder: FormBuilder, public datepicker: DpDatePickerModule, public route: Router, public service: UserService) { }

  ngOnInit(): void {

    this.addUser = this.builder.group({
      Title: ["", Validators.required],
      FirstName: ["", [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      LastName: ["", [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      UserEmailId: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      MobileNumber: ["", [Validators.required, Validators.pattern('[7-9][0-9]{9}')]],
      Password: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.minLength(8)]],
      DateOfBirth: ["", [Validators.required]],
      confirmPass: ["", [Validators.required]]
    }, { validator: [this.checkPasswords,this.checkAge] })
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('Password').value;
    let confirmPass = group.get('confirmPass').value;
    return (pass === confirmPass) ? null : { notSame: true };
  }
  checkAge(group: FormGroup) {
    let birthDate: Date = group.get('DateOfBirth').value;
    var dob= new Date(birthDate);
    let today: Date = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || (today.getMonth() == dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
    return (age<18)?{notvalid:true}:(age>120)?{overAge:true}:null;
  }
  get f() { return this.addUser.controls; }
  submitted: boolean = false;
  errorpresent: boolean;

  validateForm(form) {
    this.errorpresent = false;
    var title = this.addUser.get('Title').value;
    var fname = this.addUser.get('FirstName').value;
    var lname = this.addUser.get('LastName').value;
    var mobilenum = this.addUser.get('MobileNumber').value;
    var dob = this.addUser.get('DateOfBirth').value;
    var email = this.addUser.get('UserEmailId').value;
    var password = this.addUser.get('Password').value;
    var confirmpass = this.addUser.get('confirmPass').value;
    if (title = null || title.length < 1) {
      document.getElementById('error-title').innerHTML = " Please Enter Your Title *";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-title').innerHTML = "";
    }

    if (fname = null || fname.length < 1) {
      document.getElementById('error-fname').innerHTML = " Please Enter Your first name*";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-fname').innerHTML = "";
    }
    if (lname = null || lname.length < 1) {
      document.getElementById('error-lname').innerHTML = " Please Enter Your last name *";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-lname').innerHTML = "";
    }
    if (dob = null || dob.length < 1) {
      document.getElementById('error-dob').innerHTML = " Please Enter Your date of birth *";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-dob').innerHTML = "";
    }
    if (mobilenum = null || mobilenum.length < 1) {
      document.getElementById('error-mobilenum').innerHTML = " Please Enter Your mobile number *";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-mobilenum').innerHTML = "";
    }
    if (email = null || email.length < 1) {
      document.getElementById('error-email').innerHTML = " Please Enter Your email *";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-email').innerHTML = "";
    }
    console.log(password);
    if (password = null || password.length < 1) {
      document.getElementById('error-password').innerHTML = " Please Enter Your password *";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-password').innerHTML = "";
    }
    if (confirmpass = null || confirmpass.length < 1) {
      document.getElementById('error-confirmpass').innerHTML = " Please confirm Your password *";
      this.errorpresent = true;
    }
    else if (confirmpass != password) {
      //document.getElementById('error-confirmpass').innerHTML = " Please confirm Your password *";
      this.errorpresent = true;
    }
    else {
      document.getElementById('error-confirmpass').innerHTML = "";
    }
    if (this.errorpresent == false) {
      console.log(this.errorpresent)
      this.register(form);
    }

  }
  register(form) {
    if (form.invalid) {
      document.getElementById('error-message').innerHTML = "Please enter all required details";
      return;
    }
    let birthDate: Date = form.DateOfBirth;
    
    var dob = new Date(birthDate);
    console.log(dob);
    let today: Date = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || (today.getMonth() == dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
    console.log(age);
    this.submitted = true;
    form.Age = 1;   //any random value
    this.service.addUser(form).subscribe(data => {
      console.log(data)
      this.route.navigate(["login"]);
    }, (error) => {
      console.log(error.error.Message);
      if (error.error.Message == "Email already exists") {
        document.getElementById('error-message').innerHTML = "Email already exists";
      }
      else if (error.error.Message == "Age cannot be less than 18") {
        document.getElementById('error-message').innerHTML = "Age cannot be less than 18!";
      }
      else
        document.getElementById('error-message').innerHTML = "Please Enter valid details!!";
    });

  }
}