import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ClienteLayoutComponent } from './layouts/cliente-layout/cliente-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CanchaComponent } from './modules/cancha/cancha.component';
import { EditCanchaComponent } from './modules/admin/components/edit-cancha/edit-cancha.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AuthGuard } from './auth.guard';
import { AuthUserGuard } from './auth-user.guard';

const routes: Routes =[
    {
        path: '',
        component: ClienteLayoutComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            {
                path: 'inicio',
                component: InicioComponent
            },
            {
                path: 'perfil',
                component: ProfileComponent,
                canActivate:[AuthUserGuard]
            },
            {
                path: 'contacto',
                component: ContactoComponent
            },
            {
                path: 'equipo',
                component: EquipoComponent
            },
            {
                path: 'noticias',
                component: NoticiasComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'canchas/:id',
                component: CanchaComponent
            }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
            }
        ],
        canActivate:[AuthGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
