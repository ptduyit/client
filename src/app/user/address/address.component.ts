import { Component, OnInit } from '@angular/core';
import { ShowAddressUser } from 'src/app/model/address';
import { AddressService } from 'src/app/service/address.service';
import { Router } from '@angular/router';
import { response } from 'src/app/model/response';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses: ShowAddressUser[];
  userId = localStorage.getItem('userId');
  constructor(private addressService: AddressService, private router: Router, private title: Title) {
    this.title.setTitle('Sổ địa chỉ');
   }

  ngOnInit() {
    this.getAllAddress();
  }
  getAllAddress(){
    this.addressService.getAllAddress(this.userId)
    .subscribe((data: response) => {
      this.addresses = data.module;
    })
  }
  update(addressId: number){
    this.router.navigate(['user/edit-address/'+addressId]);
  }
  addAddress(){
    this.router.navigate(['user/add-address/']);
  }
  delete(addressId: number){
    var ans = confirm("Bạn thật sự muốn xóa?");
    if (ans) {
      this.addressService.deleteAddress(addressId)
      .subscribe(data => this.getAllAddress())
    }
  }

}
