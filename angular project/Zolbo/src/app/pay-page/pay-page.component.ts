import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css']
})
export class PayPageComponent implements OnInit {
  price:number=33.8;
  years:number[]=[2020,2021,2022,2023,2024,2025];

  alertPrice():void{
    let tempPrice:number=this.price;
    this.price=40;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
