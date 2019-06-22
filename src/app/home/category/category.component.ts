import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Menu } from 'src/app/model/product-category';
import { response } from 'src/app/model/response';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  menu: Menu[] = [];
  toggle: any = {};
  constructor(private categoryService: CategoryService) { }
  
  ngOnInit() {
    this.getMenu();
  }
  getMenu(){
    this.categoryService.getMenuCategory().subscribe((data: response)=>{
      if(!data.isError){
        this.menu = data.module;
        this.toggle =  this.menu.map(i => false);
      }
    })
  }

}
