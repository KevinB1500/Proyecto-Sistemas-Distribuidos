import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {
  
  constructor(private cookieService: CookieService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const usuarioActual = this.cookieService.get('tipo');
      if(usuarioActual==="usuario"){
        return true;
      }
      this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
      return false;
  }
  
}
