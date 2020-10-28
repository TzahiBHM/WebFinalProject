import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  constructor(private http: HttpClient, private title: Title) { }

  myForm: FormGroup;

  /*
    public name: string;
    
    public address: string;
    public email: string;
    public phone: string;
    
    public display:boolean = true;
  
    public checkChangeName(name:string):void{
      this.display = this.name==name;
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
  */

  changeDetails(): void {
    console.log(`changeDetails Function`);
    
    this.http.put<any>('http://localhost:3400/updateInfo', {
      name: this.myForm.get('name').value,
      phone: this.myForm.get('phone').value,
      address: this.myForm.get('address').value

    }).subscribe();
  }

  ngOnInit(): void {
    this.title.setTitle(' פרטי משתמש ');

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(`^[A-Za-z\u0590-\u05fe" *"]+$`)]),

      phone: new FormControl('', [Validators.required, Validators.pattern("^[0][5][0|2|3|7|4|5|9]{1}[-]{0,1}[0-9]{7}$")]),

      mail: new FormControl('', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]),
      // ^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$. - regex for email

      address: new FormControl('', Validators.required),
    })

    
    this.http.get<any>('http://localhost:3400/getInfo').subscribe(
      res=>{
        this.myForm.get('address').setValue(res.address);
        this.myForm.get('name').setValue(res.fullName);
        this.myForm.get('mail').setValue(res.email);
        this.myForm.get('phone').setValue(res.phone);
        console.log(res)
      }  ,
      err=>console.log(err)            
    );
  


  }

}
