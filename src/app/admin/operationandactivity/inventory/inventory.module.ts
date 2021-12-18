import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { InventorymasterModule } from './inventorymaster/inventorymaster.module';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';
import { GrnPurchaseComponent } from './grnpurchase/grnpurchase.component';


@NgModule({
  declarations: [InventoryComponent, PurchaseorderComponent, GrnPurchaseComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    InventorymasterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class InventoryModule { }
