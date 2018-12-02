import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataShareService } from '../shared/datashare.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isUserLoggedIn: boolean;
  constructor(private userService: UserService, private router: Router, private dataService: DataShareService) {
    this.dataService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit() {
  }
  onSubmit(username, password) {
    this.userService.userAuthentication(username, password)
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.dataService.isUserLoggedIn.next(true);
        this.router.navigate(['/home']);
      },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.isLoginError = true;
        });
  }
}
