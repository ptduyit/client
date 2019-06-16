import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserInfo } from 'src/app/model/user-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Title } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
import { response } from 'src/app/model/response';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  encapsulation:  ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  userId: string;
  userInfo: UserInfo;
  profileForm: FormGroup;
  submitted = false;
  today = new Date();
  maxDate = {year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDate()};
  minDate = {year: 1900, month: 1, day: 1};
  constructor(private userService: UserService, private fb: FormBuilder, private _service: NotificationsService,
    private title: Title) {
      this.title.setTitle('Thông tin cá nhân');
     }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.profileForm = this.fb.group({
      userId: [this.userId, Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      birthDate: ['', Validators.required],
      gender: null,
    });
    this.getUserInfo();
  }
  getUserInfo(){
    this.userService.getUserInfo(this.userId)
    .subscribe((data: response) => {
      this.userInfo = data.module;
      this.profileForm.patchValue(data.module);
    })
  }
  get f() { return this.profileForm.controls; }
  save(){
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.userService.updateUserInfo(this.profileForm.value)
    .subscribe(data => {
      this._service.success('Đã cập nhật thông tin','',
        {
          timeOut: 3000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
    })
  }
}

