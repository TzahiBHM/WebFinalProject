import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
const routes: Routes = [
  {path: 'index', component:SearchComponent},
  { path: '', redirectTo: '/index', pathMatch: 'full' }
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
