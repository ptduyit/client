import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/service/user.service';
import { response } from 'src/app/model/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  passForm : FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,private title: Title, private userService: UserService, private toastr: ToastrService) { 
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
    this.userService.changePassword(this.user.id,pold,pnew).subscribe((data: response) => {
      if(!data.isError){
        this.toastr.success("","Đổi mật khẩu thành công");
        this.passForm.reset();
        this.submitted = false;
      }else{
        switch(data.status){
          case 400: this.toastr.error("","Sai dữ liệu đầu vào");
          break;
          case 404: this.toastr.error("","Tài khoản không tồn tại");
          break;
          case 406: this.toastr.error("","Sai mật khẩu");
          break;
          case 409: this.toastr.error("","Có lỗi khi lưu dữ liệu");
          break;
        }
      }
    })
  }
}
