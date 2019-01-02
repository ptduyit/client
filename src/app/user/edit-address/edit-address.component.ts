import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/shared/address.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/model/address';
import { NotificationsService } from 'angular2-notifications';

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
  submitted = false;
  userId = localStorage.getItem('userId');
  constructor(private router: Router, private addressService: AddressService, private fb: FormBuilder,
    private avRouter: ActivatedRoute, private _service: NotificationsService) { }

  ngOnInit() {
    if (this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
    }
    this.addressForm = this.fb.group({
      addressId: 0,
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      street: ['', Validators.required],
      isDefault: false,
      userId: this.userId,
    });
    if (this.id > 0) {
      this.title="Edit";
      this.addressService.getOneAddress(this.id)
        .subscribe(data => this.addressForm.patchValue(data))
    }

  }
  get f() { return this.addressForm.controls; }
  save(){
    this.submitted = true;
    if (this.addressForm.invalid) {
      return;
    }
    if(this.title=="Create"){
      this.addressService.addAddress(this.addressForm.value)
      .subscribe(data => {
        this.router.navigate(['user/address'])
        this._service.info('Thêm thành công','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
      });
    }
    else if(this.title == "Edit"){
      this.addressService.updateAddress(this.addressForm.value)
      .subscribe(data => {
        this.router.navigate(['user/address'])
        this._service.info('Sửa thành công','',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 10
        });
      });
    }
  }
  cancel(){
    this.router.navigate(['user/address']);
  }
}
