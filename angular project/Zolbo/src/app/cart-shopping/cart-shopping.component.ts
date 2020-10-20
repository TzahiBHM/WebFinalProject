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
  constructor(private title: Title, private _carts: CartServiceService) { }
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
    this.prodctArr[index].sumOf = amount * this.prodctArr[index].price;
    this.sumOfAllProducts();
  }

  public removeItem(i: number) {
    this.prodctArr.splice(i, 1);
    if (this.prodctArr.length == 0) {
      localStorage.removeItem('cartArray');
    } else {
      localStorage.setItem('cartArray', JSON.stringify(this._carts.cart))
    }
  }

  public clearCart(): void {
    this.prodctArr.splice(0, this.prodctArr.length);
    localStorage.removeItem('cartArray');
  }

  toPay():void{
    this._carts.sumOf = this.sumOfSale;
  }

  ngOnInit(): void {
    this.title.setTitle(' סל קניות ');
  }

}
