import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-modal-new-address',
  templateUrl: './ngb-modal-new-address.component.html',
  styleUrls: ['./ngb-modal-new-address.component.css']
})
export class NgbModalNewAddressComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
