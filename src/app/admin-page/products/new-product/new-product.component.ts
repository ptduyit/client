import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";  
import { ProductService } from '../../../shared/product.service';
import { CategoryProductService } from '../../../shared/category-product.service'
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  products: Product;
  productForm: FormGroup;
  title: string = "Create";
  id: number;
  categorys: CategoryProduct[];
  constructor(private router: Router, private proService: ProductService,
    private fb: FormBuilder,private avRouter: ActivatedRoute, private categoryPro: CategoryProductService) { 
      
    }

  ngOnInit() {
    if(this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
    } 
    this.productForm = this.fb.group({
      productId: 0,
      productName: ['',[Validators.required]],
      categoryId: ['',[Validators.required]],
      unitPrice: '',
      importPrice: '',
      discontinued: '',
      discount: '',
      stock: '',
      description: '',
      image: '',
      guarantee: '',
      rate:'',
      summary: '',
      displayIndex:'',
      productImage: this.fb.array([])

    });
    
    if(this.id>0){
      this.title="Edit";
      this.proService.getProductById(this.id)
      .subscribe( data => {
        this.productForm.patchValue(data);
        this.products = data;
        console.log(data);
        this.setCompanies();
      })
    }
    this.categoryPro.getCategory().subscribe((data: CategoryProduct[]) => this.categorys = data);

  }
  addNewCompany() {
    let control = <FormArray>this.productForm.controls.productImage;
    control.push(
      this.fb.group({
        imageId: 0,
        url:'',
        productId: 0
      })
    )
  }

  deleteCompany(index) {
    let control = <FormArray>this.productForm.controls.productImage;
    control.removeAt(index);
  }


  setCompanies() {
    let control = <FormArray>this.productForm.controls.productImage;
    this.products.productImage.forEach(x => {
      control.push(this.fb.group({ 
        imageId: x.imageId, 
        url: x.url,
        productId: x.productId
         }))
    })
  }
  save(){
    if(this.title=="Create"){
      this.proService.createProduct(this.productForm.value)
      .subscribe(data => this.router.navigate(['admin/products/list-product']));
    }
    else if(this.title == "Edit"){
      this.proService.updateProduct(this.productForm.value)
      .subscribe(data => this.router.navigate(['admin/products/list-product']));
    }
  }
  cancel(){
    this.router.navigate(['admin/products/list-product']);
  }

  public tinyMceSettings = {
    skin_url: '/assets/tinymce/skins/lightgray',
    inline: false,
    statusbar: true,
    browser_spellcheck: true,
    height: 320,
    plugins: 'link image preview code',
  };
}
interface CategoryProduct {
  categoryId: number;
  categoryName: string;
}
