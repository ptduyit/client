import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductViewComponent } from './product-view/product-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { AppRoutingModule } from './app-routing.module';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SearchComponent } from './search/search.component';
import { BoughtComponent } from './bought/bought.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OrdersComponent } from './admin-page/orders/orders.component';
import { ProductsComponent } from './admin-page/products/products.component';
import { UsersComponent } from './admin-page/users/users.component';
import { OrdersImportComponent } from './admin-page/orders-import/orders-import.component';
import { StatisticsComponent } from './admin-page/statistics/statistics.component';
import { NewProductComponent } from './admin-page/products/new-product/new-product.component';
import { ListProductComponent } from './admin-page/products/list-product/list-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductShowComponent,
    ProductViewComponent,
    HomepageComponent,
    Err404Component,
    CartComponent,
    LoginComponent,
    UserInfoComponent,
    
    SignupComponent,
    
    AdminPageComponent,
    
    SearchComponent,
    
    BoughtComponent,
    
    ViewMoreComponent,
    
    OrdersComponent,
    
    ProductsComponent,
    
    UsersComponent,
    
    OrdersImportComponent,
    
    StatisticsComponent,
    
    NewProductComponent,
    
    ListProductComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
