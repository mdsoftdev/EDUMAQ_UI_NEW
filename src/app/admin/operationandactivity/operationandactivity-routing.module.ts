import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationandactivityComponent } from './operationandactivity/operationandactivity.component';


// const routes: Routes  = [
//   {path: '', component: OperationandactivityComponent,
//     children: [
//       // {path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)}
//     ]
//   },
//   {path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)}
// ];
const routes: Routes  = [
  {path: '',
    children: [
      {path: '', component: OperationandactivityComponent},
      {path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)}
    ]
  }
  // ,  {path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationandactivityRoutingModule { }
