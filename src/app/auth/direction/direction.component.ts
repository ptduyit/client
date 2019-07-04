import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {

  currentComponent: any;
  constructor(public router: Router) { }

  ngOnInit() {
    let url = this.router.url;
    if ( url.includes('/login')) {
      this.currentComponent = LoginComponent;
    } else {
      this.currentComponent = SignupComponent;
    }
  }

}
