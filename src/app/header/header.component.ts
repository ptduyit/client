import { Component, OnInit, } from '@angular/core';
import { DataShareService } from '../shared/datashare.service'
import { Router } from '@angular/router';
import { UserInfo } from '../model/user-info';
import { UserService } from '../shared/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: any;
  userInfo: UserInfo;
  token = localStorage.getItem('token');
  userId = localStorage.getItem('userId');
  constructor(private router: Router, private dataShareService: DataShareService,
    private userService: UserService, private _service: NotificationsService) {
    
  }

  ngOnInit() {
    this.dataShareService.cast.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.check();
  }
   
  check(){
    if(this.userId != null){
      this.userService.getUserInfo(this.userId).subscribe(data => this.userInfo = data);
    }
  }
  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.dataShareService.updateStatus('');
    this.token = '';
    this.userId = '';
    this._service.info('Đã đăng xuất','',
        {
          timeOut: 3000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
  }



}
