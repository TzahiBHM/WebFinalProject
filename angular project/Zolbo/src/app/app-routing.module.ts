import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ContactComponent } from './contact/contact.component';
import { UserInfoComponent } from './user-info/user-info.component';
const routes: Routes = [
  {path: 'index', component:SearchComponent},
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  {path: 'signup', component: SignUpComponent },
  {path: 'signin', component: SignInComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'info', component: UserInfoComponent },

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
