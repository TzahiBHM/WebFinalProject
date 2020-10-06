import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from "../auth.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private auth: AuthService, private router:Router, private title:Title) { }
  public register(fullName: string, address: string, mail: string, phone: string, upassword: string): void {
    this.auth.register({
      ng_fullname: fullName,
      ng_address: address,
      ng_email: mail,
      ng_phone: phone,
      ng_password: upassword
    }).subscribe(
      res => {
        console.log(res);        
        localStorage.setItem('token',res.token);
        this.router.navigate(['/index']);
      },
      err => console.log(err)
    );
  }

  public showPassword(): void {
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
    this.title.setTitle("הרשמה");
  }

}
