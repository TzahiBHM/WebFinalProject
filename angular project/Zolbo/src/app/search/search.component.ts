import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReciptService } from '../recipt.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private title:Title, private recipt:ReciptService) { }

  ngOnInit(): void {
    this.title.setTitle('עמוד הבית');
    this.recipt.was=false;
  }

}
