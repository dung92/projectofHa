import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './main-action/bill/bill.component';
import { CashComponent } from './main-action/cash/cash.component';
import { CustomerComponent } from './main-action/customer/customer.component';
import { OptionComponent } from './base-product/option/option.component';
import { ProductCategoryComponent } from './base-product/product-category/product-category.component';
import { ProductComponent } from './base-product/product/product.component';
import { ServiceComponent } from './base-product/service/service.component';
import { ProductInBillComponent } from './main-action/product-in-bill/product-in-bill.component';
import { PositionComponent } from './internal-manage/position/position.component';
import { EmployeeComponent } from './internal-manage/employee/employee.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { TrainingClassComponent } from './class-manage/training-class/training-class.component';
import { TrainingClassCategoryComponent } from './class-manage/training-class-category/training-class-category.component';
import { SessionWorkComponent } from './time-manage/session-work/session-work.component';
import { TimetableComponent } from './time-manage/timetable/timetable.component';
import { TimeRegisterComponent } from './time-manage/time-register/time-register.component';
import { CheckInComponent } from './main-action/check-in/check-in.component';
import { StudentComponent } from './class-manage/student/student.component';


const routes: Routes = [
  {
    path: 'base/product', component : ProductComponent,
    data : {permission : 'Pages.Admin.Base.Product'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'base/service', component : ServiceComponent,
    data : {permission : 'Pages.Admin.Base.Service'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'base/option', component : OptionComponent,
    data : {permission : 'Pages.Admin.Base.Option'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'base/product-category', component : ProductCategoryComponent,
    data : {permission : 'Pages.Admin.Base.ProductCategory'},
    canActivate: [AppRouteGuard]
  }, 
  {
    path: 'main/customer', component : CustomerComponent,
    data : {permission : 'Pages.Admin.Main.Customer'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'main/bill', component : BillComponent,
    data : {permission : 'Pages.Admin.Main.Bill'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'main/cash', component : CashComponent,
    data : {permission : 'Pages.Admin.Main.Cash'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'main/check-in', component : CheckInComponent,
    data : {permission : 'Pages.Admin.Main.CheckIn'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'main/bill-manage', component : ProductInBillComponent,
    data : {permission : 'Pages.Admin.Main.ProductInBill'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'internal/employee', component : EmployeeComponent,
    data : {permission : 'Pages.Admin.Internal.Employee'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'internal/position', component : PositionComponent,
    data : {permission : 'Pages.Admin.Internal.Position'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'class/class', component : TrainingClassComponent,
    data : {permission : 'Pages.Admin.Class.Class'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'class/student', component : StudentComponent,
    data : {permission : 'Pages.Admin.Class.Student'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'class/class-category', component : TrainingClassCategoryComponent,
    data : {permission : 'Pages.Admin.Class.ClassCategory'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'time/session-work', component : SessionWorkComponent,
    data : {permission : 'Pages.Admin.Time.SessionWork'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'time/timetable', component : TimetableComponent,
    data : {permission : 'Pages.Admin.Time.TimeTable'},
    canActivate: [AppRouteGuard]
  },
  {
    path: 'time/register', component : TimeRegisterComponent,
    data : {permission : 'Pages.Admin.Time.Register'},
    canActivate: [AppRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
