import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { EditCanchaComponent } from './components/edit-cancha/edit-cancha.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  { path: '', redirectTo: 'control-panel', pathMatch: 'full' },
  {
    path: 'control-panel',
    component: ControlPanelComponent,
  },
  {
    path: 'control-panel/edit',
    component: EditCanchaComponent
  },
  {
    path: 'control-panel/edit/:id',
    component: EditCanchaComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
