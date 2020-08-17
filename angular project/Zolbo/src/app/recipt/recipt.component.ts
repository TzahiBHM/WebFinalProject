import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.css']
})
export class ReciptComponent implements OnInit {
  price:number=30;
  d:Date=new Date();
  date:string = this.d.getDate() + '/'+ (this.d.getMonth() + 1) + '/' + this.d.getFullYear() ;
  recNumber:number=2009871;
  person:string = "משה דשדש";  
 inviteNumber:string="000001"; 

  constructor() { }

  ngOnInit(): void {
  }

}
