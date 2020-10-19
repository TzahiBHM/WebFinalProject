import { Injectable } from '@angular/core';
import {Product} from "./cart-shopping/shared/Product"
@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }
  cart:Product[] = [];
}
