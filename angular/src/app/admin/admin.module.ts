import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductComponent } from './base-product/product/product.component';
import { OptionComponent } from './base-product/option/option.component';
import { ServiceComponent } from './base-product/service/service.component';
import { ProductCategoryComponent } from './base-product/product-category/product-category.component';
import { CreateOrUpdateProductComponent } from './base-product/product/create-or-update-product.component';
import { CreateOrUpdateServiceComponent } from './base-product/service/create-or-update-service.component';
import { CreateOrUpdateOptionComponent } from './base-product/option/create-or-update-option.component';
import { CreateOrUpdateProductCategoryComponent } from './base-product/product-category/create-or-update-product-category.component';
import { CustomerComponent } from './main-action/customer/customer.component';
import { CreateOrUpdateCustomerComponent } from './main-action/customer/create-or-update-customer.component';
import { BillComponent } from './main-action/bill/bill.component';
import { CreateOrUpdateBillComponent } from './main-action/bill/create-or-update-bill.component';
import { CashComponent } from './main-action/cash/cash.component';
import { ProductInBillComponent } from './main-action/product-in-bill/product-in-bill.component';
import { ProductInBillDetailComponent } from './main-action/product-in-bill/product-in-bill-detail.component';
import { EmployeeComponent } from './internal-manage/employee/employee.component';
import { CreateOrUpdateEmployeeComponent } from './internal-manage/employee/create-or-update-employee.component';
import { PositionComponent } from './internal-manage/position/position.component';
import { CreateOrupdatePositionComponent } from './internal-manage/position/create-or-update-position.component';
import { TrainingClassComponent } from './class-manage/training-class/training-class.component';
import { CreateOrUpdateTrainingClassComponent } from './class-manage/training-class/create-or-update-training-class.component';
import { TrainingClassCategoryComponent } from './class-manage/training-class-category/training-class-category.component';
import { CreateOrUpdateTrainingClassCategoryComponent } from './class-manage/training-class-category/create-or-update-training-class-category.component';
import { SessionWorkComponent } from './time-manage/session-work/session-work.component';
import { CreateOrUpdateSessionWorkComponent } from './time-manage/session-work/create-or-update-session-work.component';
import { TimetableComponent } from './time-manage/timetable/timetable.component';
import { CreateOrUpdateTimetableComponent } from './time-manage/timetable/create-or-update-timetable.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { PositionPipePipe } from './pipe/position-pipe.pipe';
import { WorkStatusPipePipe } from './pipe/work-status-pipe.pipe';
import { TimeRegisterComponent } from './time-manage/time-register/time-register.component';
import { CheckInComponent } from './main-action/check-in/check-in.component';
import { StudentComponent } from './class-manage/student/student.component';




@NgModule({
  declarations: [
    ProductComponent,
    OptionComponent,
    ServiceComponent,
    ProductCategoryComponent,
    CreateOrUpdateProductComponent,
    CreateOrUpdateServiceComponent,
    CreateOrUpdateOptionComponent,
    CreateOrUpdateProductCategoryComponent,
    CustomerComponent,
    CreateOrUpdateCustomerComponent,
    BillComponent,
    CreateOrUpdateBillComponent,
    CashComponent,
    ProductInBillComponent,
    ProductInBillDetailComponent,
    EmployeeComponent,
    CreateOrUpdateEmployeeComponent,
    PositionComponent,
    CreateOrupdatePositionComponent,
    TrainingClassComponent,
    CreateOrUpdateTrainingClassComponent,
    TrainingClassCategoryComponent,
    CreateOrUpdateTrainingClassCategoryComponent,
    SessionWorkComponent,
    CreateOrUpdateSessionWorkComponent,
    TimetableComponent,
    CreateOrUpdateTimetableComponent,
    PositionPipePipe,
    WorkStatusPipePipe,
    TimeRegisterComponent,
    CheckInComponent,
    StudentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    NzCheckboxModule,
    NzNotificationModule
  ],
  providers: [],
})
export class AdminModule { }
