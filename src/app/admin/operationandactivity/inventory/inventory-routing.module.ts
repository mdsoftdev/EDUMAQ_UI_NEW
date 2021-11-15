import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {path: '',
    children: [
      {path: '',  component: InventoryComponent},
      {path: 'inventorymaster', loadChildren: () => import('./inventorymaster/inventorymaster.module').then(m => m.InventorymasterModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
