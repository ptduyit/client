import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/service/datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('token');
  constructor(private toastr: ToastrService, private dataShareService: DataShareService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.dataShareService.updateStatus(null);
    this.dataShareService.updateNumberProduct(0);
    this.token = null;
    this.user = null;
    this.toastr.info("","Đã đăng xuất");
    this.router.navigateByUrl(this.router.url);
  }
}
