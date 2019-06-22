import { NgModule, Injectable } from '@angular/core';
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
import { MaterialModule } from '../material-module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMaskModule } from 'ngx-mask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { NgbDatepickerModule, NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NotifycationComponent } from './notifycation/notifycation.component';
import { MyReviewComponent } from './my-review/my-review.component';

@Injectable()
export class NgbStringAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    if(date){
      let dateUTC = new Date(date);
      let dateLocal = new Date(Date.UTC(dateUTC.getFullYear(),dateUTC.getMonth(),dateUTC.getDate(),
      dateUTC.getHours(),dateUTC.getMinutes(),dateUTC.getSeconds(),dateUTC.getMilliseconds()));
      return {
        year: dateLocal.getFullYear(),
        month: dateLocal.getMonth() + 1,
        day: dateLocal.getDate()
      }
    }
    else return null;
  }
  toModel(date: NgbDateStruct) :Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}
export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}
@Injectable()
export class NgbDateFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return { year: toInteger(dateParts[0]), month: null, day: null };
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
      `${isNumber(date.day) ? padNumber(date.day) : ''}-${isNumber(date.month) ? padNumber(date.month) : ''}-${date.year}` :
      '';
  }
}
const I18N_VALUES = {
  'vi': {
    weekdays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    months: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
  }
  // other languages you would support
};
@Injectable()
export class I18n {
  language = 'vi';
}
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MaterialModule,
    
    SweetAlert2Module,
    NgxMaskModule,
    RadioButtonModule,
    CheckboxModule,
    NgbDatepickerModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    AddressComponent,
    EditAddressComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    NotifycationComponent,
    MyReviewComponent
  ],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    { provide: NgbDateAdapter, useClass: NgbStringAdapter },
    { provide: NgbDateParserFormatter, useClass: NgbDateFormatter }
  ]
})
export class UserModule { }
