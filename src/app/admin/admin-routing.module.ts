import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersImportComponent } from './orders-import/orders-import.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { NewOrderComponent } from './orders-import/new-order/new-order.component';
import { ListOrdersImportComponent } from './orders-import/list-orders-import/list-orders-import.component';
import { AuthGuard } from '../guard/auth.guard';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'orders' },
          { path: 'users', component: UsersComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'slide', component: SlideshowComponent},
          { path: 'statistics', component: StatisticsComponent },
          { 
            path: 'orders-import', component: OrdersImportComponent ,
            children: [
              { path: 'new-order', component: NewOrderComponent},
              { path: 'edit/:id', component: NewOrderComponent},
              { path: '', component: ListOrdersImportComponent}
            ]
          },
          
          {
            path: 'products', component: ProductsComponent,
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'list-product' },
              { path: 'list-product', component: ListProductComponent },
              { path: 'new-product', component: NewProductComponent },
              { path: 'edit/:id', component: NewProductComponent }
            ]
          },
          {
            path: '**', component: PageNotFoundComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
