import { Component, Input, OnInit } from '@angular/core';
import { ProductInBillServiceProxy, ProductInBillViewModel } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-product-in-bill-detail',
  templateUrl: './product-in-bill-detail.component.html',
})
export class ProductInBillDetailComponent implements OnInit {

  @Input() productInBillBinding : ProductInBillViewModel

  constructor( private productInBillService : ProductInBillServiceProxy,) { }

  ngOnInit(): void {
    setTimeout(() => {
      //console.log(this.productInBillBinding)
    }, 1000);
    
  }

}
