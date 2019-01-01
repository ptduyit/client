import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { DataShareService } from '../shared/datashare.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private dataService: DataShareService) { }

  ngOnInit() {
  }
  onSubmit(signup){
    this.userService.signup(signup.value.fullname, signup.value.email, signup.value.password, signup.value.phonenumber)
    .subscribe((data: any) => {
      this.dataService.updateStatus(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
          this.router.navigate(['/home']);
    }),
    err => console.log(err);    
  }
}
