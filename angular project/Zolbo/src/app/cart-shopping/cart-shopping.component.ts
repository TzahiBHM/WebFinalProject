import { Component, OnInit } from '@angular/core';
import { Product } from "./shared/Product";
@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {

  sumOfSale: number;

  prodctArr: Product[] = [
    { "name": "chips", "image": "a.jpg", "price": 30, "mkt": "MKT1", "amount": 2, sumOf: 60 },
    { "name": "humus", "image": "b.jpg", "price": 21, "mkt": "MKT2", "amount": 1, sumOf: 21 },
    { "name": "chips", "image": "c.jpg", "price": 80, "mkt": "MKT3", "amount": 5, sumOf: 200 }
  ]

  public sumOfAllProducts(): void {
    let sum = 0;
    for (let p of this.prodctArr) {
      sum += p.sumOf;
    }
    this.sumOfSale=sum;
  }


  public changeTotalPrice(index: number, amount: number): void {
    this.prodctArr[index].amount = amount;
    this.prodctArr[index].sumOf = amount * this.prodctArr[index].price;
    this.sumOfAllProducts();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
