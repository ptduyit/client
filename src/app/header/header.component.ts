import { Component, OnInit, } from '@angular/core';
import { DataShareService } from '../shared/datashare.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: any;
  token = localStorage.getItem('token');
  userId = localStorage.getItem('userId');
  constructor(private router: Router, private dataShareService: DataShareService) {
    
  }

  ngOnInit() {
    this.dataShareService.cast.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }
   
  
  Logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    this.dataShareService.updateStatus('');
    this.token = '';
    this.userId = '';
    this.router.navigate(['/login']);
  }
  logined: boolean = true;
  username = "Hungkk";
  cart = 3;


}
