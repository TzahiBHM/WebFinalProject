import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  /* fake user */
  public name: string = "משה";
  public age: number = 20;
  public address: string = "משה דיין 68 פתח תקווה"
  public email: string = "moshe@moshe.com"
  public phone: string = "0502645308";
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

/*
  public checkChanges(): void {
   // alert('1');
    if (this.name == "משה" &&
      this.email == "moshe@moshe.com" &&
      this.age == 20 &&
      this.phone == "058" &&
      this.address == "משה דיין 68 פתח תקווה") {
      this.display =  false;
    }

    this.display = true;
  }
*/
  constructor() { }

  ngOnInit(): void {
  }

}
