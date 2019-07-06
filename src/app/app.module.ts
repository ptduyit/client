import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig } from  'ngx-ui-loader';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';

import { ProductsModule } from './products/products.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { NgbModalSelectAddressComponent } from './cart/ngb-modal-select-address/ngb-modal-select-address.component';
import { CategoryComponent } from './home/category/category.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("349227848582-8qk4dfv1hsqvql2mg9nf21r1dhed26vh.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1194855687339141")
  }
]);

export function provideConfig() {
  return config;
}
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  blur: 4,
  fgsColor: "#1cfbff",
  fgsSize: 70,
  fgsType: "three-strings",
  pbColor: "red",
  pbThickness: 3,
  threshold: 300,
  bgsColor: "#5f1eef",
  bgsType: "ball-spin-clockwise"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,   
    SearchComponent,
    NgbModalSelectAddressComponent,
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
    LayoutModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({positionClass: 'toast-bottom-right', closeButton: true, timeOut: 8000}),
    SweetAlert2Module.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SocialLoginModule,
    SlickCarouselModule,
    NgxUiLoaderRouterModule.forRoot({ showForeground: false }),
    NgxUiLoaderHttpModule
  ],
  entryComponents:[
    NgbModalSelectAddressComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  constructor(private router: Router){
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));

    
  }
  
}
