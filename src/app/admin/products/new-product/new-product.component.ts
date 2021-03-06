import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from '../../../service/product.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Product } from '../../../model/product';
import { ViewEncapsulation } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import * as globals from 'src/globals';
import { Title } from '@angular/platform-browser';
import { response } from 'src/app/model/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  products: Product = {} as any;
  productForm: FormGroup;
  id: number;
  categorySelect = [];
  submitted = false;
  uploadedFiles: File[] = [];
  imageDelete = [];
  constructor(private router: Router, private proService: ProductService, private fb: FormBuilder,
    private avRouter: ActivatedRoute, private categoryService: CategoryService, private title: Title,
    private toastr: ToastrService) {
    this.title.setTitle('Thêm sản phẩm mới');
  }

  ngOnInit() {
    
    this.productForm = this.fb.group({
      productId: 0,
      productName: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      unitPrice: ['', Validators.required],
      discontinued: ['', Validators.required],
      discount: ['', Validators.required],
      description: ['', Validators.required],
      guarantee: ['', Validators.required],
      summary: ['', Validators.required],
      displayIndex: ['', Validators.required],
      createAt: new Date(),
      stock: 0,
      productImages: this.fb.array([])
    });

    this.categoryService.getCategorySelectProduct().subscribe((rs: response) => {
      if (!rs.isError) {
        rs.module.forEach(element => {
          this.categorySelect.push({ label: element.categoryName, value: element.categoryId })
        });
        this.productForm.get('categoryId').setValue(this.products.categoryId); // set default select primeng
      } else {
        console.log(rs.message);
      }

    });
    if (this.avRouter.snapshot.params["id"]) {
      this.title.setTitle('Chỉnh sửa sản phẩm');
      this.id = this.avRouter.snapshot.params["id"];
      this.proService.getProductById(this.id).subscribe((data: response) => {
        if (!data.isError) {
          this.productForm.patchValue(data.module.products);
          this.products = data.module.products;
          this.products.importPrice = data.module.priceImport;
          this.setImages();
        }
        else {
          console.log(data.message);
        }
      })
    }
  }
  get f() { return this.productForm.controls; }

  onClear() {
    this.uploadedFiles = [];
  }
  onSelect(event) {
    for (let file of event.files) {
      let index = this.uploadedFiles.findIndex(x => x.name == file.name)
      if (index === -1)
        this.uploadedFiles.push(file);
    }
  }
  onRemove(event) {
    const index = this.uploadedFiles.indexOf(event.file);
    this.uploadedFiles.splice(index, 1);
  }
  preDelete() {
    this.imageDelete = [];
    let control = <FormArray>this.productForm.controls.productImages;
    control.controls = [];
    this.setImages();
  }
  deleteImage(index, image) {
    let control = <FormArray>this.productForm.controls.productImages;
    control.removeAt(index);
    this.imageDelete.push({ imageId: image.value.imageId, path: image.value.path });
  }
  setImages() {
    let control = <FormArray>this.productForm.controls.productImages;
    this.products.productImages.forEach(x => {
      control.push(this.fb.group({
        imageId: x.imageId,
        url: globals.server + x.url,
        path: x.url
      }));
    });
  }
  save() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    let formData: FormData = new FormData();
    this.uploadedFiles.forEach(e => {
      formData.append('files', e);
    });
    formData.append('product', JSON.stringify(this.productForm.value));

    if (this.id > 0) {
      formData.append('imageDelete', JSON.stringify(this.imageDelete));
      this.proService.updateProduct(this.id, formData).subscribe((data: response) => {
        if (!data.isError) {
          this.back();
          this.toastr.success("", "Cập nhật thành công");
        }
        else console.log(data.message);
      });
    }
    else{
      this.proService.createProduct(formData).subscribe((data:response)=>{
        if (!data.isError) {
          this.back();
          this.toastr.success("", "Đã thêm mới sản phẩm");
        }
        else console.log(data.message);
      })
    }

  }
  back() {
    this.router.navigate(['admin/products/list-product']);
  }

  public tinyMceSettings = {
    skin_url: '/assets/tinymce/skins/lightgray',
    inline: false,
    statusbar: true,
    height: 320,
    plugins: ['link image preview code fullpage textcolor colorpicker table insertdatetime fullscreen'],
    file_picker_types: 'image',
    images_upload_handler: function (blobInfo, success, failure) {
      let formData: FormData = new FormData();
      formData.append('files', blobInfo.blob());
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', globals.server + 'api/upload');
      xhr.onload = function () {
        if (xhr.status != 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        var json = JSON.parse(xhr.responseText);
        if (!json || typeof json.url != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(globals.server + json.url);
      };
      xhr.send(formData);
    },
    // file_picker_callback: function (cb, value, meta) {
    //   var input = document.createElement('input');
    //   input.setAttribute('type', 'file');
    //   input.setAttribute('accept', 'image/*');
    //   input.onchange = function(){
    //     var file = input.files[0];
    //     let formData : FormData = new FormData();
    //     formData.append('files',file);
    //     var xhr = new XMLHttpRequest();
    //     xhr.withCredentials = false;
    //     xhr.open('POST', globals.server+'api/upload');
    //     xhr.onload = function() {
    //       if (xhr.status != 200) {
    //         return;
    //       }
    //       var json = JSON.parse(xhr.responseText);
    //       if (!json || typeof json.url != 'string') {
    //         return;
    //       }
    //       cb(globals.server+''+json.url,{title: file.name});
    //     };
    //     xhr.send(formData);
    //   }
    //   input.click();      
    // }
  };
}
