import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserInfo } from 'src/app/model/user-info';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {
  userId: string;
  userInfo: UserInfo;
  profileForm: FormGroup;
  public min = new Date(1900,1,1);
  public max = new Date();
  public startMoment = new Date();
  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.profileForm = this.fb.group({
      userId: '',
      fullName: '',
      phone: '',
      birthDate: '',
      gender: '',
    });
    this.getUserInfo();
  }
  getUserInfo(){
    this.userService.getUserInfo(this.userId)
    .subscribe(data => {
      this.userInfo = data;
      this.profileForm.patchValue(data);
      console.log(data);
    })
  }
  save(){
    console.log(this.profileForm.value);
    this.userService.updateUserInfo(this.profileForm.value)
    .subscribe(data => {
      console.log(data);
    })
  }
}
