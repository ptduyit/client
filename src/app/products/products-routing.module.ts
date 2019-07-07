import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { CategoryResolverService } from './category-resolver.service';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ProductResolverService } from './product-resolver.service';
import { SearchComponent } from './search/search.component';
import { SearchResolverService } from './search-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'products/:id',
        component: ProductsComponent,
        resolve: { productResolve: ProductResolverService}
      },
      { 
        path: 'category/:url',
        component: CategoryComponent,
        resolve: {
          dataResolve: CategoryResolverService
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        resolve: { searchResolve: SearchResolverService}
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CategoryResolverService,
    ProductResolverService,
    SearchResolverService
  ]
})
export class ProductsRoutingModule { }
