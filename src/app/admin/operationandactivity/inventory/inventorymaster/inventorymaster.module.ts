import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventorymasterRoutingModule } from './inventorymaster-routing.module';
import { InventorymasterComponent } from './inventorymaster/inventorymaster.component';
import { ItemgroupComponent } from './itemgroup/itemgroup.component';
import { ItemcategoryComponent } from './itemcategory/itemcategory.component';
import { SuppliertypeComponent } from './suppliertype/suppliertype.component';
import { TaxComponent } from './tax/tax.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ItemcreationComponent } from './itemcreation/itemcreation.component';


@NgModule({
  declarations: [InventorymasterComponent, ItemgroupComponent, ItemcategoryComponent, SuppliertypeComponent, TaxComponent, SupplierComponent, ItemcreationComponent],
  imports: [
    CommonModule,
    InventorymasterRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InventorymasterModule { }
