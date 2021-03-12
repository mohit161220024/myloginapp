import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import {AuthguardService} from './services/authguard.service';
import {AuthguardloginpageService} from './services/authguardloginpage.service';
import { ContactusComponent } from './components/contactus/contactus.component';


const routes: Routes = [
  {path:"",redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthguardService]},
  {path:"contact",component:ContactusComponent,canActivate:[AuthguardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
