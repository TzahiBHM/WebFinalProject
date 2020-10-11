import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReciptService } from '../recipt.service';

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.css']
})
export class ReciptComponent implements OnInit {
  price: number = 30;
  d: Date = new Date();
  date: string = this.d.getDate() + '/' + (this.d.getMonth() + 1) + '/' + this.d.getFullYear();
  recNumber: number = 2009871;
  person: string = "ישראל ישראלי";
  inviteNumber: string = "000001";

  constructor(private title: Title, private router: Router, private recipt:ReciptService) { }

  ngOnInit(): void {
    this.title.setTitle("אישור הזמנה");
    setTimeout(() => {
      this.router.navigate(['/index']);
    }, 5000);
   this.recipt.was=true;
  }

}
