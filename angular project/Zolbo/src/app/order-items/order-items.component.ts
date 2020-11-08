import { Component, OnInit } from '@angular/core';
import { CartServiceService } from "../cart-service.service"
import { HttpClient } from "@angular/common/http";
import { Product } from '../cart-shopping/shared/Product';
@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  constructor(public _cart: CartServiceService, private http: HttpClient) { }

  list: Product[] = [];
  price: number;
  date: string;
  // list - Prodcut[], price - number
  ngOnInit(): void {
    this._cart.lastOrder = parseInt(localStorage.getItem('lastOrder'));
    let url = `http://localhost:3400/getitems/${this._cart.lastOrder}`;
    this.http.get<any>(url).subscribe((res) => {
      this.list = JSON.parse(res[0].list);
      this.price = res[0].price;
      this.date = res[0].order_date;
    });
  }

}
