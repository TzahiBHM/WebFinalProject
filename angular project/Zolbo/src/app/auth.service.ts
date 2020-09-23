import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlRegister="http://localhost:3400/register";
  urlLogin="http://localhost:3400/login";

  constructor(private http:HttpClient) { }
  register(user){
    return this.http.post<any>(this.urlRegister,user);
  }  
  login(user){
    return this.http.post<any>(this.urlLogin,user);
  }
}
