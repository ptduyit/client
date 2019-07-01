import { Component, OnInit, Injectable, HostBinding } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserInfo } from 'src/app/model/user-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { response } from 'src/app/model/response';
import { slide } from 'src/app/animation/animation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  animations: [ slide ]
})
export class EditProfileComponent implements OnInit {
  @HostBinding('@slideAnimation')
  public animateSlide = true;

  user = JSON.parse(localStorage.getItem('user'));
  userInfo: UserInfo;
  profileForm: FormGroup;
  submitted = false;
  today = new Date();
  maxDate = {year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDate()};
  minDate = {year: 1900, month: 1, day: 1};
  constructor(private userService: UserService, private fb: FormBuilder, private toastr: ToastrService,
    private title: Title) {
      this.title.setTitle('Thông tin cá nhân');
     }

  ngOnInit() {
    this.profileForm = this.fb.group({
      userId: [this.user.id, Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      birthDate: ['', Validators.required],
      gender: null,
    });
    this.getUserInfo();
  }
  getUserInfo(){
    this.userService.getUserInfo(this.user.id)
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
    .subscribe((data:response) => {
      if(!data.isError){
        this.toastr.success("","Đã cập nhật thông tin");
      }
    })
  }
}

