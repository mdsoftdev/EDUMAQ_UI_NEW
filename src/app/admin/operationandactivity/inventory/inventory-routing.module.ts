import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrnPurchaseComponent } from './grnpurchase/grnpurchase.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';

const routes: Routes = [
  {path: '',
    children: [
      {path: '',  component: InventoryComponent},
      {path: 'purchaseorder', component: PurchaseorderComponent},
      {path: 'purchase', component: GrnPurchaseComponent},
      {path: 'inventorymaster', loadChildren: () => import('./inventorymaster/inventorymaster.module').then(m => m.InventorymasterModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
