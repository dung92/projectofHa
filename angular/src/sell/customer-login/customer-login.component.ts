import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerServiceProxy, CustomerViewModel } from '@shared/service-proxies/service-proxies';



@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
})
export class CustomerLoginComponent implements OnInit {

  loginForm: FormGroup;
  customerList: CustomerViewModel[] = [];
  loginSuccess : boolean;
  public loginAccount : CustomerViewModel; // lay ra duoc tai khoan login
  constructor(private fb: FormBuilder, 
    private customerService: CustomerServiceProxy,) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCustomer('')
  }

  getAllCustomer(keyword: string) {
    this.customerService.getAllCustomer(keyword).subscribe(x => this.customerList = x);
  }

  submitForm(value: { userName: string; password: string; }): void {
    for (const key in this.loginForm.controls) {
      this.loginForm.controls[key].markAsDirty();
      this.loginForm.controls[key].updateValueAndValidity();
    }

    this.login(value.userName, value.password);
  }

  login(userName : string, password: string): void {
    this.customerService.login(userName, password).subscribe(x => this.loginSuccess = x)

    setTimeout(() => {
      if(this.loginSuccess)
      {
        location.href = '/sell/page';
        this.loginAccount = this.customerList.find(x => x.userName == userName && x.password == password)
        sessionStorage.setItem( 'loginAcountUserName', this.loginAccount.userName);
        sessionStorage.setItem( 'loginAcountId', this.loginAccount.id.toString());
      }
      else
      {
        alert("Tên đăng nhập và mật khẩu không đúng")
      }
      
    }, 500);
  }

}
