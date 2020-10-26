import { Component, OnInit, } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private title: Title) { }

  myForm: FormGroup;



  public register(fullName: string, address: string, mail: string, phone: string, upassword: string): void {
    console.log(`register function`);
    
    this.auth.register({
      ng_fullname: fullName,
      ng_address: address,
      ng_email: mail,
      ng_phone: phone,
      ng_password: upassword
    }).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/index']);
      },
      err => console.log(err)
    );
  }

  ngOnInit(): void {
    this.title.setTitle("הרשמה");

    this.myForm = new FormGroup({      
      name: new FormControl('',[Validators.required,Validators.pattern("^[a-z\u0590-\u05fe]+$")]),
      
      address: new FormControl('',Validators.required),
      
      
      mail: new FormControl('',[Validators.required,Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
      + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]),
      // ^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$. - regex for email
      phone: new FormControl('',[Validators.required,Validators.pattern("^[0][5][0|2|3|7|4|5|9]{1}[-]{0,1}[0-9]{7}$")]),
      password: new FormControl('',Validators.required),
    })

  }

}
