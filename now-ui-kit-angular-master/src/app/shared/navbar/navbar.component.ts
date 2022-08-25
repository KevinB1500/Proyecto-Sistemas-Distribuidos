import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth.guard';
import { AuthUserGuard } from 'app/auth-user.guard';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    condicionAdmin: boolean;
    condicionUser: boolean;
    condicionNologgeado: boolean;

    constructor(public location: Location, private element: ElementRef, private cookieService: CookieService,
        private router: Router, public authAdmin: AuthGuard, public authUser: AuthUserGuard) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.condicionUser= this.cookieService.get("tipo")=="usuario";
        this.condicionNologgeado=this.cookieService.get("tipo")=="" || this.cookieService.get("tipo")=="undefined";
        console.log(this.condicionNologgeado)
        console.log(this.condicionUser)
        if(this.condicionUser){
            document.getElementById("nav7").classList.remove("d-none")
            document.getElementById("nav6").classList.remove("d-none")
            document.getElementById("nav5").classList.add("d-none")
        }
        if(this.condicionNologgeado){
            document.getElementById("nav7").classList.add("d-none")
            document.getElementById("nav6").classList.add("d-none")
            document.getElementById("nav5").classList.remove("d-none")
        }
        document.getElementById("nav6").addEventListener('click', () => {
            console.log("entro")
            this.cookieService.set('nombre', "");
            this.cookieService.set('idUsuario', "");
            this.cookieService.set('tipo', ""); 
            this.router.navigate(["/login"]);
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }
}
