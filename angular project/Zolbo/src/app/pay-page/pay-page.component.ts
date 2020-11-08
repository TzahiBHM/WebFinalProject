import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartServiceService } from "../cart-service.service";
import { HttpClient } from "@angular/common/http";
import {  Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css']
})
export class PayPageComponent implements OnInit {

  constructor(private title: Title, private _carts: CartServiceService, private _http: HttpClient, private router:Router) { }

  myForm: FormGroup;
  price:number;
  

  pay(): void {
    let url = "http://localhost:3400/sendOrder";
    let date = new Date();
    this._http.post(url, {
      ng_list: (JSON.stringify(this._carts.cart)),
      ng_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      ng_price: this._carts.sumOf
    }).subscribe();
    this._carts.cart = [];
    localStorage.removeItem('cartStorage');
    this.router.navigate(['/recipt']);
  }


  ngOnInit(): void {
    this.title.setTitle("עמוד תשלום");

    this.price= this._carts.sumOf;

    this.myForm = new FormGroup({
      price: new FormControl(this.price.toFixed(2), [Validators.required]),

      cardNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{16}$")]),

      year: new FormControl('', [Validators.required, Validators.pattern("^202[0-9]$")]),
      
      month: new FormControl('', [Validators.required, Validators.pattern("^0[1-9]|1[0-2]$")]),

      name: new FormControl('',[Validators.required,Validators.pattern(`^[A-Za-z\u0590-\u05fe" *"]+$`)]),
    })
  }
}
