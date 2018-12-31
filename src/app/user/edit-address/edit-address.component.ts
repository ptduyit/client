import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/shared/address.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  id: number;
  address: Address;
  title: string = "Create";
  addressForm: FormGroup;
  constructor(private router: Router, private addressService: AddressService, private fb: FormBuilder,
    private avRouter: ActivatedRoute) { }

  ngOnInit() {
    if (this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
    }
    this.addressForm = this.fb.group({
      addressId: '',
      fullName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      isDefault: '',
      userId: '',
    });
    if (this.id > 0) {
      this.title="Edit";
      this.addressService.getOneAddress(this.id)
        .subscribe(data => this.addressForm.patchValue(data))
    }

  }
  save(){
    if(this.title=="Create"){
      this.addressService.addAddress(this.addressForm.value)
      .subscribe(data => this.router.navigate(['user/address']));
    }
    else if(this.title == "Edit"){
      this.addressService.updateAddress(this.addressForm.value)
      .subscribe(data => this.router.navigate(['user/address']));
    }
  }
  cancel(){
    this.router.navigate(['user/address']);
  }
}
