import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  constructor(private http:HttpClient, private title:Title) { }

  public name: string;
  public age: number;
  public address: string;
  public email: string;
  public phone: string;
  
  public display:boolean = true;

  public checkChangeName(name:string):void{
    this.display = this.name==name;
  }
  public checkChangeAge(age:number):void{
    this.display = this.age==age;
  }
  public checkChangeAddress(address:string):void{
    this.display = this.address==address;
  }
  public checkChangeEmail(email:string):void{
    this.display = this.email==email;
  }
  public checkChangePhone(phone:string):void{
    this.display = this.phone==phone;
  }


  changeDetails():void{

    this.http.put<any>('http://localhost:3400/updateInfo',{
      name:this.name,
      address:this.address,
      email:this.email,
      phone:this.phone
    }).subscribe();
    
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3400/getInfo').subscribe(
      res=>{
        this.name=res.fullName;
        this.address=res.address
        this.email=res.email;
        this.phone=res.phone;
        console.log(res)
      }  ,
      err=>console.log(err)            
    );

    this.title.setTitle(' פרטי משתמש ');

  }

}
