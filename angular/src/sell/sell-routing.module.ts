import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { DanceIntroComponent } from './dance-intro/dance-intro.component';
import { PageComponent } from './page/page.component';
import { SellComponent } from './sell.component';
import { ShopingComponent } from './shoping/shoping.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { TimetableOfCustomerComponent } from './timetable-of-customer/timetable-of-customer.component';
import { YogaIntroComponent } from './yoga-intro/yoga-intro.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SellComponent,
        children: [
          { path: 'shoping', component: ShopingComponent },
          { path: 'login', component: CustomerLoginComponent },
          { path: 'register', component: CustomerRegisterComponent },
          { path: 'student', component: StudentRegisterComponent },
          { path: 'page', component: PageComponent },
          { path: 'time', component: TimetableOfCustomerComponent },
          { path: 'yoga-introduction', component: YogaIntroComponent },
          { path: 'dance-introduction', component: DanceIntroComponent },
        ]
      }
    ]),
    CarouselModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class SellRoutingModule { }
