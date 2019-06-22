import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/service/user.service';
import { response } from 'src/app/model/response';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userId = localStorage.getItem('userId');
  passForm : FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,private title: Title, private userService: UserService) { 
    this.title.setTitle('Đổi mật khẩu');
  }

  ngOnInit() {
  this.passForm = this.fb.group({
    passOld: ['',[Validators.required,Validators.maxLength(50)]],
    passwords: this.fb.group({
      passNew: ['',[Validators.required,Validators.maxLength(50)]],
      passConfirm: ['',[Validators.required,Validators.maxLength(50)]]
    }, {validators: this.passwordConfirming})
    
  });

  }
  passwordConfirming(c: AbstractControl): { notmatch: boolean } {
    if (c.get('passNew').value !== c.get('passConfirm').value) {
        return {notmatch: true};
    }
}
  get f() { return this.passForm.controls; }
  get p() { return (this.passForm.controls.passwords as FormGroup).controls}
  save(){
    this.submitted = true;
    if (this.passForm.invalid) {
      return;
    }
    let pold = this.passForm.value.passOld;
    let pnew = this.passForm.value.passwords.passNew;
    this.userService.changePassword(this.userId,pold,pnew).subscribe((data: response) => {
      if(!data.isError){
        console.log("success");
      }else{
        switch(data.status){
          case 400: console.log("lỗi đầu vào");
          break;
          case 404: console.log("tài khoản ko tồn tại");
          break;
          case 406: console.log("sai mật khẩu");
          break;
          case 409: console.log("không thể lưu");
          break;
        }
      }
    })
  }
}
