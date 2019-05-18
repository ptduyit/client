import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { Err404Component } from './err404/err404.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { Router } from '@angular/router';

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
    HomeComponent,
    Err404Component,
    CartComponent,   
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    ProductsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  constructor(router: Router){
    const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
