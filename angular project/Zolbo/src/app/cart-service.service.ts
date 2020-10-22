import { Injectable } from '@angular/core';
import { Product } from "./cart-shopping/shared/Product"
@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  constructor() {

    /*
    let local = localStorage.getItem('cartArray');
    if (local) {
      console.log('local array' , JSON.parse(local));      
      this.cart = JSON.parse(local);
      console.log('cart service',this.cart);      
    }
    else {
      console.log('local clear');      
      this.cart = [];
      console.log('cart service',this.cart);
    }
    console.log('cart service length',this.cart.length);
    */
  }


  cart: Product[]=[]; // JSON.parse(localStorage.getItem('cartArray'));
  sumOf: number;
  lastOrder: number;

}
