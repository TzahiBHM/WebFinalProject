import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ContactComponent } from './contact/contact.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CartShoppingComponent } from './cart-shopping/cart-shopping.component';
import { OldOrdersComponent } from './old-orders/old-orders.component';
import { PayPageComponent } from './pay-page/pay-page.component';
import { ReciptComponent } from './recipt/recipt.component';
import { AuthService } from "./auth.service";
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService} from "./token-interceptor.service"
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SignUpComponent,
    SignInComponent,
    ContactComponent,
    UserInfoComponent,
    CartShoppingComponent,
    OldOrdersComponent,
    PayPageComponent,
    ReciptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
