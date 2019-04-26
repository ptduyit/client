import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryResolverService } from '../category-resolver.service';
import { from } from 'rxjs';
import { ProductCategory } from 'src/app/model/product-category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: ProductCategory = {} as ProductCategory;
  errorMessage: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategory();
  }
  getCategory(){
    // const resolvedData = this.route.snapshot.data['dataResolve'];
    this.route.data.subscribe( data => {
      this.errorMessage = data.dataResolve.error;
      this.category = data.dataResolve;
    })
  }
}
