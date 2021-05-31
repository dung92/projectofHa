import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellRoutingModule } from './sell-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShopingComponent } from './shoping/shoping.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import {MatButtonModule} from '@angular/material/button';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { PageComponent } from './page/page.component';
import { SellComponent } from './sell.component';
import { FooterComponent } from './footer/footer.component';
import { TimetableOfCustomerComponent } from './timetable-of-customer/timetable-of-customer.component';
import { YogaIntroComponent } from './yoga-intro/yoga-intro.component';
import { DanceIntroComponent } from './dance-intro/dance-intro.component';


@NgModule({
  declarations: [
    ShopingComponent,
    CustomerLoginComponent,
    CustomerRegisterComponent,
    StudentRegisterComponent,
    PageComponent,
    SellComponent,
    FooterComponent,
    TimetableOfCustomerComponent,
    YogaIntroComponent,
    DanceIntroComponent
  ],
  imports: [
    CommonModule,
    SellRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NzGridModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzDropDownModule,
    NzInputModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzCollapseModule,
    CarouselModule.forRoot(),
  ],
  exports: [
    MatButtonModule
  ]
})
export class SellModule { }
