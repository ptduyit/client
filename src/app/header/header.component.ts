import { Component, OnInit, } from '@angular/core';
import { DataShareService } from '../shared/datashare.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean;
  constructor(private router: Router, private dataShareService: DataShareService) {
    this.dataShareService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit() {
  }
  id = localStorage.getItem('userToken');
  Logout() {
    localStorage.removeItem('userToken');
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }
  logined: boolean = true;
  username = "Hungkk";
  cart = 3;


}
