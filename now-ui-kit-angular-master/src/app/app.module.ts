import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AdminModule } from './modules/admin/admin.module';
import { ClienteLayoutComponent } from './layouts/cliente-layout/cliente-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CanchaModule } from './modules/cancha/cancha.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageService } from './services/message/message.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ClienteLayoutComponent,
        AdminLayoutComponent,
        LoginComponent,
        ProfileComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        AdminModule,
        CanchaModule,
        HttpClientModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
