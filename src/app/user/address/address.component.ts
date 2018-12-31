import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { AddressService } from 'src/app/shared/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses: Address[];
  add: Address;
  userId = localStorage.getItem('userId');
  constructor(private addressService: AddressService, private router: Router) { }

  ngOnInit() {
    this.getAllAddress();
  }
  getAllAddress(){
    this.addressService.getAllAddress(this.userId)
    .subscribe(data => {
      this.addresses = data;
    })
  }
  update(addressId: number){
    this.router.navigate(['user/edit-address/'+addressId]);
  }
  delete(addressId: number){
    var ans = confirm("Bạn thật sự muốn xóa?");
    if (ans) {
      this.addressService.deleteAddress(addressId)
      .subscribe(data => this.getAllAddress())
    }
  }

}
