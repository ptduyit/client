import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ngb-modal-new-category',
  templateUrl: './ngb-modal-new-category.component.html',
  styleUrls: ['./ngb-modal-new-category.component.css']
})
export class NgbModalNewCategoryComponent implements OnInit {
  @Input() name;
  categoryForm: FormGroup;
  submitted = false;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: ['',[Validators.required]],
      categoryId: ['',[Validators.required]]
    });
  }
  get f() { return this.categoryForm.controls; }
  save(){
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
  }
}
