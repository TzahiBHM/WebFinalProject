import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private title: Title, private http: HttpClient) { }

  name: string = "";
  phone: string = "";
  email: string = "";
  content: string = "";

  checkLength(str:string):boolean{
    if(str.length>0){
      return true;
    }
    return false;
  }

  send(): void {
    this.http.post<any>("http://localhost:3400/sendmail", {
      ng_name: this.name,
      ng_phone: this.phone,
      ng_email: this.email,
      ng_content: this.content
    })
      .subscribe();
  }

  ngOnInit(): void {
    this.title.setTitle(' צור קשר ');
    this.http.get<any>('http://localhost:3400/getInfo')
      .subscribe(res => {
        this.name = res.fullName;
        this.email = res.email;
        this.phone = res.phone;
      });
  }

}
