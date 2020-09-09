import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private http:HttpClient) { }
  id:any='test';
  res:any;
  verify(email:string,passwrod:string):void{
    this.http.post("http://localhost:3400/login",
    {      
      ng_username:email,
      ng_password: passwrod
    }).subscribe((res)=>{
      this.res=res;
      // window.location="/index";
    });
  }

  ngOnInit(): void {
  }

}
