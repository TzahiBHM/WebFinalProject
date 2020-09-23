import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private auth:AuthService) { }  
  
  verify(email:string,passwrod:string):void{
    this.auth.login({
      ng_username:email,
      ng_password: passwrod
    }).subscribe(
      res => {
        console.log(res);        
        localStorage.setItem('token',res.token);
      },
      err=>console.log(err)      
    );
  } 
  ngOnInit(): void {
  }

}
