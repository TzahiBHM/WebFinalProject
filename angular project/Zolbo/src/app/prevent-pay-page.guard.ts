import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ReciptService } from './recipt.service';


@Injectable({
  providedIn: 'root'
})
export class PreventPayPageGuard implements CanActivate {
  constructor(private recipt: ReciptService, private router:Router) { }
  canActivate() {
    if(!this.recipt.was){
      return true;
    }
    else{
      this.router.navigate(['/index']);
      return false;
    }

  }
}
