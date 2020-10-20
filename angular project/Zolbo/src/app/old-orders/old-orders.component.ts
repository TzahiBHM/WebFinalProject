import { Component, OnInit } from '@angular/core';
import { OldOrder } from "./shared/oldOrder"
import { Title } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-old-orders',
  templateUrl: './old-orders.component.html',
  styleUrls: ['./old-orders.component.css']
})
export class OldOrdersComponent implements OnInit {
  constructor(private title: Title, private _http: HttpClient) { }

  oldOrderArray: OldOrder[] = []


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
