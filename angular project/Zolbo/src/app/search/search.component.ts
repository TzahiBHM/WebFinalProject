import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReciptService } from '../recipt.service';
import { HttpClient } from "@angular/common/http"
import { Item } from "./shared/item.module"
import { CartServiceService } from "../cart-service.service";
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private title: Title, private recipt: ReciptService, private http: HttpClient, private _carts: CartServiceService, private _auth: AuthService) { }

  searchResult: Item[];

  addItem(i: number): void {

    if (this._auth.loggedIn() == false) {
      alert('יש להתחבר למערכת');
    }

    else {
      let newPrice = this.searchResult[i].price.replace('₪', '')
      let prodcutToPush = {
        name: this.searchResult[i].title,
        price: parseFloat(newPrice),
        image: this.searchResult[i].imageLink,
        amount: 1,
        sumOf: parseFloat(newPrice)
      }

      this._carts.cart.push(prodcutToPush)
      localStorage.setItem('cartStorage', JSON.stringify(this._carts.cart))

      console.log(this._carts.cart);
      alert('מוצר התווסף לעגלה');

      this.searchResult.splice(i, 1);
    }
  }

  checkDisplay(str: string): boolean {
    if (str.length > 0) {
      return true;
    }
    return false;
  }


  sortPrice(): void {
    function price(obj) { //convert obj.price to float
      return parseFloat(obj.price.replace(/[^\.\d]/g, ''));
    }
    this.searchResult.sort((val1, val2) => {
      return price(val1) - price(val2);
    });
  }


  sortAlphabet(): void {
    this.searchResult.sort((val1, val2) => {
      if (val1.company < val2.company) { return -1 };
      return 1;
    });
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

    if (localStorage.getItem('cartStorage')) {
      this._carts.cart = JSON.parse(localStorage.getItem('cartStorage'));
    }
  }
}
