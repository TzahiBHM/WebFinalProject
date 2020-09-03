import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {  
  res:any;
  constructor(private http:HttpClient) { }
  public register(fullName:string,address:string,mail:string,phone:string,upassword:string):void{    

    this.http.post("http://localhost:3500/register",
    {      
      ng_fullname:fullName,
      ng_address:address,
      ng_email:mail,
      ng_phone:phone,
      ng_password:upassword
    })
    .subscribe();
    alert("Dont remove it ");
  }
  ngOnInit(): void {
  }

}
