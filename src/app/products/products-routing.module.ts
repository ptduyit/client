import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { CategoryResolverService } from './category-resolver.service';

const routes: Routes = [
  { path: 'products/:id', component: ProductsComponent },
  { 
    path: 'category/:url',
    component: CategoryComponent,
    resolve: {
      dataResolve: CategoryResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoryResolverService]
})
export class ProductsRoutingModule { }
