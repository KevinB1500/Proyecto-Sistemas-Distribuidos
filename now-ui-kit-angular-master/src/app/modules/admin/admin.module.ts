import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { BarComponent } from './components/reportes/graficos/bar/bar.component';
import { PieComponent } from './components/reportes/graficos/pie/pie.component';
import { ScatterComponent } from './components/reportes/graficos/scatter/scatter.component';
import { EditCanchaComponent } from './components/edit-cancha/edit-cancha.component';


@NgModule({
  declarations: [
    ControlPanelComponent,
    ReportesComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    EditCanchaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
