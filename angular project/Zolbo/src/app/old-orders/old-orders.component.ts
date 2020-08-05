import { Component, OnInit } from '@angular/core';
import {OldOrder} from "./shared/oldOrder"
@Component({
  selector: 'app-old-orders',
  templateUrl: './old-orders.component.html',
  styleUrls: ['./old-orders.component.css']
})
export class OldOrdersComponent implements OnInit {

  oldOrderArray: OldOrder[] = [
    {number:100,date: new Date("2019-01-16").toLocaleString(),price:18.90},
    {number:200,date: new Date("2019-02-16").toLocaleString(),price:28},
    {number:300,date: new Date("2020-03-16").toLocaleString(),price:15.30}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
