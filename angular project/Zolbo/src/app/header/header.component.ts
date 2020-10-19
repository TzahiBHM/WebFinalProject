import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {CartServiceService} from "../cart-service.service"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService,public _carts:CartServiceService) { }

  ngOnInit(): void {
  }

}
