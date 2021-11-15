import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationandactivityRoutingModule } from './operationandactivity-routing.module';
import { OperationandactivityComponent } from './operationandactivity/operationandactivity.component';
import { InventoryModule } from './inventory/inventory.module';



@NgModule({
  declarations: [OperationandactivityComponent],
  imports: [
    CommonModule,
    OperationandactivityRoutingModule,
    InventoryModule
  ]
})
export class OperationandactivityModule { }
