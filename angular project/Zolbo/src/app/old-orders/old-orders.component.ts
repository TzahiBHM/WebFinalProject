import { Component, OnInit } from '@angular/core';
import { OldOrder } from "./shared/oldOrder"
import { Title } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import {CartServiceService} from "../cart-service.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-old-orders',
  templateUrl: './old-orders.component.html',
  styleUrls: ['./old-orders.component.css']
})
export class OldOrdersComponent implements OnInit {
  constructor(private title: Title, private _http: HttpClient, private _cart:CartServiceService, private router:Router) { }

  oldOrderArray: OldOrder[] = []

  orderItems(i):void{
    // this._cart.lastOrder = this.oldOrderArray[i].orderId;
    localStorage.setItem('lastOrder',(this.oldOrderArray[i].orderId).toString());
    this.router.navigate(['order-items']);    
  }

  ngOnInit(): void {
    this.title.setTitle("הזמנות קודמות");
    let url = "http://localhost:3400/getorders";
    this._http.get<any>(url).subscribe((res) => {
       console.log(res);
      for (let i = 0; i < res.length; i++) {
        let jsonList = JSON.parse(res[i].list);
        this.oldOrderArray.push({
          orderId: res[i].order_id,
          list: jsonList,
          date: res[i].order_date,
          price: res[i].price
        })
      }
    });
  }


}
