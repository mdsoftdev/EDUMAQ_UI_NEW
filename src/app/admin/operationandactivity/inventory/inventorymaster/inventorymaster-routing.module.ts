import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventorymasterComponent } from './inventorymaster/inventorymaster.component';
import { ItemgroupComponent } from './itemgroup/itemgroup.component';
import { ItemcategoryComponent } from './itemcategory/itemcategory.component';
import { SuppliertypeComponent } from './suppliertype/suppliertype.component';
import { TaxComponent } from './tax/tax.component';
import { SupplierComponent } from './supplier/supplier.component';


const routes: Routes  = [
  {path: '',
    children: [
      {path: '',  component: InventorymasterComponent},
      {path: 'itemgroup', component: ItemgroupComponent},
      {path: 'itemcategory', component: ItemcategoryComponent},
      {path: 'suppliertype', component: SuppliertypeComponent},
      {path: 'tax', component: TaxComponent},
      {path: 'supplier', component: SupplierComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventorymasterRoutingModule { }
