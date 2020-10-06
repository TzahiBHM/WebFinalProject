import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import{Router} from "@angular/router";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router, private title:Title) { }  
  
  verify(email:string,passwrod:string):void{
    this.auth.login({
      ng_username:email,
      ng_password: passwrod
    }).subscribe(
      res => {
        console.log(res);        
        localStorage.setItem('token',res.token);
        this.router.navigate(['/index']);
      },
      err=>console.log(err)      
    );
  } 
  ngOnInit(): void {
    this.title.setTitle("כניסה למערכת");
  }

}
