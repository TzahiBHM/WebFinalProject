import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReciptService } from '../recipt.service';
import { HttpClient } from "@angular/common/http"
import { Item } from "./shared/item.module"
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private title: Title, private recipt: ReciptService, private http: HttpClient) { }

  searchResult: Item[];

  checkDisplay(str: string): boolean {
    if (str.length > 0) {
      return true;
    }
    return false;
  }


  search(itemSearch): void {

    this.searchResult = [];
    let url;
    
    url = `http://localhost:3400/shufersal/${itemSearch}`;

    this.http.get<Item[]>(url).subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].title != "") {
            res[i].price = "₪".toString() + res[i].price;
            this.searchResult.push(res[i]);
          }
        }
      },
      err => console.log(err)
    )

    url = `http://localhost:3400/victory/${itemSearch}`;

    this.http.get<Item[]>(url).subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].title != "") {
            this.searchResult.push(res[i]);
          }
        }
      },
      err => console.log(err)
    )
    
    url = `http://localhost:3400/tipa/${itemSearch}`;

    this.http.get<Item[]>(url).subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].title != "") {
            this.searchResult.push(res[i]);
          }
        }
      },
      err => console.log(err)
    )
  }

  ngOnInit(): void {
    this.title.setTitle('עמוד הבית');
    this.recipt.was = false;
  }
}
