import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EquipoComponent } from './equipo/equipo.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
      ],
    declarations: [
        ComponentsComponent,
        InicioComponent,
        ContactoComponent,
        EquipoComponent,
        NoticiasComponent,
        PageNotFoundComponent
    ],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
