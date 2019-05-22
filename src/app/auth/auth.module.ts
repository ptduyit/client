import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CheckPasswordDirective } from './signup/check-password.directive';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DirectionComponent } from './direction/direction.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    CheckPasswordDirective,
    DirectionComponent
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
