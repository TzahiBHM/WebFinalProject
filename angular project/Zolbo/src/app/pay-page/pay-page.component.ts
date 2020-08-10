import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css']
})
export class PayPageComponent implements OnInit {
  price:number=33.8;
  years:number[]=[2020,2021,2022,2023,2024,2025];

  public checkBeforSend(cardNumber:number,month: number):void{
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
