import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router, private title:Title) {}

  ngOnInit(): void {
    setTimeout(() => {
        this.router.navigate(['/index']);
    }, 5000);  

    this.title.setTitle('עמוד לא קיים 404');
  }
  

}
