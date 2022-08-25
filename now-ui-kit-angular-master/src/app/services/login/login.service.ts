import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from 'app/interfaces/cuenta';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LikeService } from '../like/like.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticate(usuario: string, clave: string): Observable<Cuenta> {
    return this.http.post<Cuenta>(`${environment.datababe_url}/usuarios/validate`, {"usuario": usuario, "clave":clave}, {withCredentials: true});
  }

}
