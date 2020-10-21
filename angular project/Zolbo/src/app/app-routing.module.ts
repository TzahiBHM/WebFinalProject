import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ContactComponent } from './contact/contact.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CartShoppingComponent } from './cart-shopping/cart-shopping.component';
import { OldOrdersComponent } from './old-orders/old-orders.component';
import { PayPageComponent } from './pay-page/pay-page.component';
import { ReciptComponent } from './recipt/recipt.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { PreventPayPageGuard } from './prevent-pay-page.guard';
import { OrderItemsComponent } from './order-items/order-items.component';
const routes: Routes = [
  {path: 'index', component:SearchComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full' },
  {path: 'signup', component: SignUpComponent },
  {path: 'signin', component: SignInComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'info', component: UserInfoComponent,canActivate:[AuthGuard] },
  {path: 'cart', component: CartShoppingComponent,canActivate:[AuthGuard]},
  {path: 'old-orders', component: OldOrdersComponent,canActivate:[AuthGuard] },
  {path: 'payment', component: PayPageComponent, canActivate:[AuthGuard,PreventPayPageGuard] },
  {path: 'recipt', component: ReciptComponent,canActivate:[AuthGuard] },
  {path: 'order-items',component:OrderItemsComponent,canActivate:[AuthGuard]},
  {path: '**',component:NotFoundComponent},
];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
