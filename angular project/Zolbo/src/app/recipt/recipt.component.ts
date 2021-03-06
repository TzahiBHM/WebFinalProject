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

  constructor(private title: Title, private router: Router, private recipt: ReciptService) { }

  recNumber: number = Math.round(Math.random() * (99999 - 10000) + 10000);

  ngOnInit(): void {
    this.title.setTitle("אישור הזמנה");
    setTimeout(() => {
      this.router.navigate(['/index']);
    }, 8000);

    // guard from pay page
    this.recipt.was = true;
  }

}
