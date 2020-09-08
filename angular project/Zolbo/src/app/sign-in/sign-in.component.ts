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
  verify(email:string,passwrod:string):void{
    // alert(email + " " + passwrod);    
  }

  testUser(userEmail:string):void{
    this.http.get(`http://localhost:3400/userid/${userEmail}`).subscribe((res)=>{
      this.id=res[0].user_id;
      console.log(res);
    });
  }

  ngOnInit(): void {
  }

}
