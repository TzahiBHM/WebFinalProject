import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {  
  res:any;
  constructor(private http:HttpClient) { }
  public register(fullName:string,address:string,mail:string,phone:string,upassword:string):void{    

    this.http.post("http://localhost:3400/register",
    {      
      ng_fullname:fullName,
      ng_address:address,
      ng_email:mail,
      ng_phone:phone,
      ng_password:upassword
    })
    .subscribe();
    alert("נרשם בהצלחה ברוך הבא");
  }

public showPassword():void{
  /*
  let x = document.getElementById("password");
  if(x.type==="password"){
    x.type="text";
  }else {
    x.type = "password";
  }
  */
}

  ngOnInit(): void {
  }

}
