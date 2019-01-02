import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserInfo } from 'src/app/model/user-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

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
  submitted = false;
  public min = new Date(1900,1,1);
  public max = new Date();
  public startMoment = new Date();
  constructor(private userService: UserService, private fb: FormBuilder, private _service: NotificationsService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.profileForm = this.fb.group({
      userId: [this.userId, Validators.required],
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      birthDate: ['', Validators.required],
      gender: '',
    });
    this.getUserInfo();
  }
  getUserInfo(){
    this.userService.getUserInfo(this.userId)
    .subscribe(data => {
      this.userInfo = data;
      this.profileForm.patchValue(data);
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
