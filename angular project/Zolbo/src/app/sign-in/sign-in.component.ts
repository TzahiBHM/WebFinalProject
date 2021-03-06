import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private title: Title) { }


  myForm: FormGroup;

  verify(email: string, passwrod: string): void {
    this.auth.login({
      ng_username: email,
      ng_password: passwrod
    }).subscribe(
      res => {
        // correct password and user 
        if (res.token != undefined) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/index']);
        }
        else {
          if (res == "wrong password"){
            alert("סיסמה לא נכונה");
          }
          else{
            alert("כתבות דוא''ל לא קיימת במערכת");
          }
        }
      },
      err => console.log(err)
    );
  }

  ngOnInit(): void {
    this.title.setTitle("כניסה למערכת");

    this.myForm = new FormGroup({

      mail: new FormControl('', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]),
      // ^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$. - regex for email

      password: new FormControl('', Validators.required),
    })

  }

}
