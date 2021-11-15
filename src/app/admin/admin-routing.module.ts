import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'academic', loadChildren: () => import('./academic/academic.module').then(m => m.AcademicModule)},
      {path: 'operationandactivity', loadChildren: () => import('./operationandactivity/operationandactivity.module').then(m => m.OperationandactivityModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
