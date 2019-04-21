import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductViewComponent } from './product-view/product-view.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { AppRoutingModule } from './app-routing.module';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SearchComponent } from './search/search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OrdersComponent } from './admin-page/orders/orders.component';
import { ProductsComponent } from './admin-page/products/products.component';
import { UsersComponent } from './admin-page/users/users.component';
import { OrdersImportComponent } from './admin-page/orders-import/orders-import.component';
import { StatisticsComponent } from './admin-page/statistics/statistics.component';
import { NewProductComponent } from './admin-page/products/new-product/new-product.component';
import { ListProductComponent } from './admin-page/products/list-product/list-product.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeHtmlPipe } from './safe-html-pipe';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { EvaluationComponent } from './product-view/evaluation/evaluation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1194855687339141")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("349227848582-8qk4dfv1hsqvql2mg9nf21r1dhed26vh.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductShowComponent,
    ProductViewComponent,
    HomeComponent,
    Err404Component,
    CartComponent,   
    AdminPageComponent,    
    SearchComponent,            
    OrdersComponent,    
    ProductsComponent,    
    UsersComponent,    
    OrdersImportComponent,    
    StatisticsComponent,    
    NewProductComponent,    
    ListProductComponent,    
    ButtonRendererComponent,
    SafeHtmlPipe,
    EvaluationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    AuthModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    EditorModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
