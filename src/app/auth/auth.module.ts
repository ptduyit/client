import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CheckPasswordDirective } from './signup/check-password.directive';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    CheckPasswordDirective
  ]
})
export class AuthModule { }
