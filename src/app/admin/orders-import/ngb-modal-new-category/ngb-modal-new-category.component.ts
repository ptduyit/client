import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/service/category.service';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-ngb-modal-new-category',
  templateUrl: './ngb-modal-new-category.component.html',
  styleUrls: ['./ngb-modal-new-category.component.css']
})
export class NgbModalNewCategoryComponent implements OnInit {
  @Output() returnCategory: EventEmitter<any> = new EventEmitter();
  categoryForm: FormGroup;
  submitted = false;
  categorySelect: any = [];
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
     private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: ['',[Validators.required]],
      url: ['',[Validators.required]],
      parentId: null,
      category: ''
    });
    this.categoryService.getCategorySelectAll().subscribe(data => {
      this.categorySelect = data;
    });
    this.categoryForm.get('url').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(res => {
      if(res !== ''){
        this.categoryService.checkUrl(res).subscribe((rs:any) => {
          console.log(rs.success);
        })
      }
    });
    this.categoryForm.get('category').setValue(0);
  }
  get f() { return this.categoryForm.controls; }
  save(){
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    this.categoryService.addCategory(this.categoryForm.value).subscribe(rs => {
      this.returnCategory.emit(rs);
      this.activeModal.close();
    })
  }
  changeSelected(event){
    const id = event.target.value;
    if(id > 0)
      this.categoryForm.get('parentId').setValue(id);
    else
    this.categoryForm.get('parentId').setValue(null);
  }
}
