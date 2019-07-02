import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/service/category.service';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { response } from 'src/app/model/response';
import { ToastrService } from 'ngx-toastr';

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
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private toastr: ToastrService,
     private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: ['',[Validators.required]],
      url: ['',[Validators.required]],
      parentId: null,
      category: ''
    });
    this.categoryService.getCategorySelectAll().subscribe((data:response) => {
      if(!data.isError){
        this.categorySelect = data.module;
      }
      else console.log(data.message);
    });
    this.categoryForm.get('url').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(res => {
      if(res !== ''){
        this.categoryService.checkUrl(res).subscribe((rs:response) => {
          console.log(rs.status);
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
    this.categoryService.addCategory(this.categoryForm.value).subscribe((rs:response) =>{
      if(!rs.isError){
        this.toastr.success("","Đã thêm danh mục mới");
        this.returnCategory.emit(rs.module);
        this.activeModal.close();
      }else {
        this.toastr.error("","Có lỗi khi thêm danh mục");
      }
      
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
