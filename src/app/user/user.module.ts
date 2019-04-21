import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    AddressComponent,
    EditAddressComponent,
    MyOrdersComponent,
    OrderDetailComponent
  ]
})
export class UserModule { }
