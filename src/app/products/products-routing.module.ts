import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { CategoryResolverService } from './category-resolver.service';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'products/:id', component: ProductsComponent },
      { 
        path: 'category/:url',
        component: CategoryComponent,
        resolve: {
          dataResolve: CategoryResolverService
        }
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoryResolverService]
})
export class ProductsRoutingModule { }
