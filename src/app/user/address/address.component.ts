import { Component, OnInit, HostBinding } from '@angular/core';
import { ShowAddressUser } from 'src/app/model/address';
import { AddressService } from 'src/app/service/address.service';
import { Router } from '@angular/router';
import { response } from 'src/app/model/response';
import { Title } from '@angular/platform-browser';
import { slide } from 'src/app/animation/animation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  animations: [
    slide
  ]
})
export class AddressComponent implements OnInit {
  @HostBinding('@slideAnimation')
  public animateSlide = true;

  addresses: ShowAddressUser[] = [];
  user = JSON.parse(localStorage.getItem('user'));
  constructor(private addressService: AddressService, private router: Router, 
    private title: Title, private toastr: ToastrService) {
    this.title.setTitle('Sổ địa chỉ');
   }

  ngOnInit() {
    this.getAllAddress();
  }
  getAllAddress(){
    this.addressService.getAllAddress(this.user.id)
    .subscribe((data: response) => {
      if(!data.isError){
        this.addresses = data.module;
      }
      
    })
  }
  update(addressId: number){
    this.router.navigate(['user/edit-address/'+addressId]);
  }
  addAddress(){
    this.router.navigate(['user/add-address/']);
  }
  delete(addressId: number){
      this.addressService.deleteAddress(addressId).subscribe((data:response) => {
        if(!data.isError){
          this.getAllAddress();
        }
        else{
          this.toastr.error("","Có lỗi khi xóa");
        } 
      })
  }

}
