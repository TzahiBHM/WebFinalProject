import { Component, OnInit } from '@angular/core';
import { Product } from "./shared/Product";
import { Title } from '@angular/platform-browser';
import { CartServiceService } from "../cart-service.service"
@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {
  constructor(private title: Title, public _carts: CartServiceService) { }


  sumOfSale: number;

  prodctArr: Product[] = this._carts.cart;
  public sumOfAllProducts(): void {
    let sum = 0;
    for (let p of this.prodctArr) {
      sum += p.sumOf;
    }
    this.sumOfSale = sum;
  }


  public changeTotalPrice(index: number, amount: number): void {
    this.prodctArr[index].amount = amount;

    // update cartStorage
    localStorage.setItem('cartStorage', JSON.stringify(this.prodctArr));
    
    this.prodctArr[index].sumOf = amount * this.prodctArr[index].price;
    this.sumOfAllProducts();
  }

  public removeItem(i: number) {
    this.prodctArr.splice(i, 1);
    
    if (this.prodctArr.length == 0) {
      localStorage.removeItem('cartStorage');
    } else {
      localStorage.setItem('cartStorage', JSON.stringify(this.prodctArr))
    }
    
  }

  public clearCart(): void {
    this.prodctArr.splice(0, this.prodctArr.length);
    this._carts.cart=[];
    localStorage.removeItem('cartStorage');
  }

  toPay():void{
    this._carts.sumOf = this.sumOfSale;
  }

  ngOnInit(): void {
    this.title.setTitle(' סל קניות ');
    
    // update cart service
    if (localStorage.getItem('cartStorage')) {
      this._carts.cart = JSON.parse(localStorage.getItem('cartStorage'));
      this.prodctArr = this._carts.cart;
    }
  }

}
