import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(signup){
    this.userService.signup(signup.value.fullname, signup.value.email, signup.value.password, signup.value.phonenumber)
    .subscribe(data => {
      this.router.navigate(['/login']);
    }),
    err => console.log(err);    
  }
}
