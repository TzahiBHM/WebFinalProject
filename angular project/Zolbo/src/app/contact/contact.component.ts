import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartServiceService } from "../cart-service.service";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private title: Title, private http: HttpClient, private _carts:CartServiceService) { }

  myForm: FormGroup;

  // name: string = "";
  // phone: string = "";
  // email: string = "";
  // content: string = "";

  checkLength(str: string): boolean {
    if (str.length > 0) {
      return true;
    }
    return false;
  }

  send(): void {
    this.http.post<any>("http://localhost:3400/sendmail", {
      ng_name: JSON.stringify(this.myForm.get('name').value),
      ng_phone: JSON.stringify(this.myForm.get('phone').value),
      ng_email: JSON.stringify(this.myForm.get('mail').value),
      ng_content: JSON.stringify(this.myForm.get('content').value)
    })
      .subscribe((res) => {

      });
  }

  ngOnInit(): void {
    this.title.setTitle(' צור קשר ');

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(`^[A-Za-z\u0590-\u05fe" *"]+$`)]),

      phone: new FormControl('', [Validators.required, Validators.pattern("^[0][5][0|2|3|7|4|5|9]{1}[-]{0,1}[0-9]{7}$")]),

      mail: new FormControl('', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]),
      // ^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$. - regex for email

      content: new FormControl('', Validators.required),
    })

    this.http.get<any>('http://localhost:3400/getInfo')
      .subscribe(res => {
        this.myForm.get('name').setValue(res.fullName);
        this.myForm.get('mail').setValue(res.email);
        this.myForm.get('phone').setValue(res.phone);
      });


      // update cart service
      if (localStorage.getItem('cartStorage')) {
        this._carts.cart = JSON.parse(localStorage.getItem('cartStorage'));
      }
  }

}
