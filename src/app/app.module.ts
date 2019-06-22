import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider,} from "angular-6-social-login";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';

import { ProductsModule } from './products/products.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { NgbModalSelectAddressComponent } from './cart/ngb-modal-select-address/ngb-modal-select-address.component';
import { NgbModalNewAddressComponent } from './cart/ngb-modal-new-address/ngb-modal-new-address.component';
import { CategoryComponent } from './home/category/category.component';

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
    HomeComponent,
    CartComponent,   
    SearchComponent,
    NgbModalSelectAddressComponent,
    NgbModalNewAddressComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    LayoutModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({positionClass: 'toast-bottom-right', closeButton: true}),
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule
  ],
  entryComponents:[
    NgbModalSelectAddressComponent,
    NgbModalNewAddressComponent
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
  constructor(){
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));

    
  }
  
}
