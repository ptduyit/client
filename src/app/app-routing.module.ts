import { NgModule } from '@angular/core';
import { ProductViewComponent } from './product-view/product-view.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SearchComponent } from './search/search.component';
import { OrdersComponent } from './admin-page/orders/orders.component';
import { OrdersImportComponent } from './admin-page/orders-import/orders-import.component';
import { ProductsComponent } from './admin-page/products/products.component';
import { StatisticsComponent } from './admin-page/statistics/statistics.component';
import { UsersComponent } from './admin-page/users/users.component';
import { ListProductComponent } from './admin-page/products/list-product/list-product.component';
import { NewProductComponent } from './admin-page/products/new-product/new-product.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'view/:id', component: ProductViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { 
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin', component: AdminPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'orders' },
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders-import', component: OrdersImportComponent },
      {
        path: 'products', component: ProductsComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'list-product' },
          { path: 'list-product', component: ListProductComponent },
          { path: 'new-product', component: NewProductComponent },
          { path: 'edit/:id', component: NewProductComponent }
        ]
      },
      { path: 'statistics', component: StatisticsComponent },
    ]
  },
  // { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Err404Component },

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
