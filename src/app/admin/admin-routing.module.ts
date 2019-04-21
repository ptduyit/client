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
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'orders' },
          { path: 'users', component: UsersComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'orders-import', component: OrdersImportComponent },
          { path: 'statistics', component: StatisticsComponent },
          {
            path: 'products', component: ProductsComponent,
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'list-product' },
              { path: 'list-product', component: ListProductComponent },
              { path: 'new-product', component: NewProductComponent },
              { path: 'edit/:id', component: NewProductComponent }
            ]
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
