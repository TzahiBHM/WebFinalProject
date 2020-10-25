import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartServiceService } from "../cart-service.service";
import { HttpClient } from "@angular/common/http";
import {  Router} from '@angular/router';
@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css']
})
export class PayPageComponent implements OnInit {

  constructor(private title: Title, private _carts: CartServiceService, private _http: HttpClient, private router:Router) { }

  price: number = this._carts.sumOf;
  years: number[] = [2020, 2021, 2022, 2023, 2024, 2025];


  pay(): void {
    let url = "http://localhost:3400/sendOrder";
    let date = new Date();
    this._http.post(url, {
      ng_list: (JSON.stringify(this._carts.cart)),
      ng_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      ng_price: this._carts.sumOf
    }).subscribe();
    this._carts.cart = [];
    // localStorage.removeItem('cartArray');
    this.router.navigate['/recipt'];
  }


  ngOnInit(): void {
    this.title.setTitle("עמוד תשלום");
  }
}
