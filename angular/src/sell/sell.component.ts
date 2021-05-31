import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  curentUserName : string;
  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('loginAcountUserName') != undefined)
    {
      this.curentUserName = sessionStorage.getItem('loginAcountUserName');
    }
    else
    {
      this.curentUserName = 'Tài khoản'
    }
  }

  clearSession()
  {
    sessionStorage.clear();
    location.reload();
  }
}
