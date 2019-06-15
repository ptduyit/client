import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/service/datashare.service';
import { NotificationsService } from 'angular2-notifications';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  haha= 1;
  comfirmpassword: '2';
  constructor(private authService: AuthService, private router: Router, private dataService: DataShareService
    ,private _service: NotificationsService, private title: Title) {
      this.title.setTitle('Đăng ký');
     }

  ngOnInit() {
  }
  onSubmit(signup:any){
    this.authService.signup(signup.value.fullname, signup.value.email, signup.value.password, signup.value.phonenumber)
    .subscribe((data: any) => {
      this.dataService.updateStatus(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
          this.router.navigate(['/home']);
          this._service.success(
            'Đăng ký thành công',
            'Vui lòng chờ',
            {
              position: ["bottom", "right"],
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 10
            }
          );
    },
    err => {
      this._service.error(
        'Đăng Ký thất bại',
        'Vui lòng thử lại',
        {
          position: ["bottom", "right"],
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        }
    );
      console.log(err);    
    }
    )
  }
}
