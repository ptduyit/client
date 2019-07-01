import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AddressService } from 'src/app/service/address.service';
import { ShowAddressUser } from 'src/app/model/address';
import { response } from 'src/app/model/response';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngb-modal-select-address',
  templateUrl: './ngb-modal-select-address.component.html',
  styleUrls: ['./ngb-modal-select-address.component.css']
})
export class NgbModalSelectAddressComponent implements OnInit {
  @Output() returnAddress: EventEmitter<ShowAddressUser> = new EventEmitter();
  user = JSON.parse(localStorage.getItem('user'));
  addresses : ShowAddressUser[] = [];
  constructor(private addressService: AddressService, public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit() {
    this.addressService.getAllAddress(this.user.id).subscribe((data: response) => {
      if(!data.isError){
        this.addresses = data.module;
      }
    })
  }
  Select(address: ShowAddressUser){
    this.returnAddress.emit(address);
  }
  addAddress(){
    this.activeModal.close();
    this.router.navigate(['user/add-address']);

  }

}
