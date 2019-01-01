import { NgModule } from '@angular/core';
import { ProductViewComponent } from './product-view/product-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BoughtComponent } from './bought/bought.component';
import { SearchComponent } from './search/search.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { OrdersComponent } from './admin-page/orders/orders.component';
import { OrdersImportComponent } from './admin-page/orders-import/orders-import.component';
import { ProductsComponent } from './admin-page/products/products.component';
import { StatisticsComponent } from './admin-page/statistics/statistics.component';
import { UsersComponent } from './admin-page/users/users.component';
import { ListProductComponent } from './admin-page/products/list-product/list-product.component';
import { NewProductComponent } from './admin-page/products/new-product/new-product.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { AddressComponent } from './user/address/address.component';
import { EditAddressComponent } from './user/edit-address/edit-address.component';
import { MyOrdersComponent } from './user/my-orders/my-orders.component';
import { OrderDetailComponent } from './user/order-detail/order-detail.component';

const routes: Routes = [
  { path: 'view/:id', component: ProductViewComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'cart', component: CartComponent },
  { 
    path: 'user', component: UserComponent ,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'edit-profile'},
      { path: 'profile', component: ProfileComponent},
      { path: 'my-orders', component: MyOrdersComponent},
      { path: 'address', component: AddressComponent},
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'add-address', component: EditAddressComponent },
      { path: 'edit-address/:id', component: EditAddressComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'order-detail', component: OrderDetailComponent },
      { path: 'user-info', component: UserInfoComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
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
  { path: 'bought/:id', component: BoughtComponent },
  { path: 'search', component: SearchComponent },
  { path: 'view-more', component: ViewMoreComponent },







  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //error de cuoi cung
  { path: '**', component: Err404Component },

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
