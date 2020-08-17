import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
