import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AcademicModule } from './academic/academic.module';
import { OperationandactivityModule } from './operationandactivity/operationandactivity.module';

@NgModule({
  declarations: [DashboardComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AcademicModule,
    OperationandactivityModule
  ]
})
export class AdminModule { }
