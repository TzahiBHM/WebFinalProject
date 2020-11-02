import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router"
import {CartServiceService} from "./cart-service.service"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlRegister="http://localhost:3400/register";
  urlLogin="http://localhost:3400/login";

  constructor(private http:HttpClient, private router:Router, private carts:CartServiceService) { }
  register(user){
    return this.http.post<any>(this.urlRegister,user);
  }  
  login(user){
    return this.http.post<any>(this.urlLogin,user);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('cartStorage');
    localStorage.removeItem('lastOrder');
    this.carts.cart=[];
    this.router.navigate(['/index']);
  }
}
