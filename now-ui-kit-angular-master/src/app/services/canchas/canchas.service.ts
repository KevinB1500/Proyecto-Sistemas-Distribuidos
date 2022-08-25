import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cancha } from 'app/interfaces/cancha';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LikeService } from '../like/like.service';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  constructor(
    private http: HttpClient,
    private likeService: LikeService
  ) { }

  list(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${environment.datababe_url}/canchas`);
  }

  get(id: string): Observable<Cancha> {
    return this.http.get<Cancha>(`${environment.datababe_url}/canchas/${id}`);
  }

  delete(id: string): Observable<Cancha> {
    return this.http.delete<Cancha>(`${environment.datababe_url}/canchas/${id}`);
  }

  add(cancha: Cancha): Observable<Cancha> {
    return this.http.post<Cancha>(`${environment.datababe_url}/canchas/add`, cancha);
  }

  update(cancha: Cancha) {
    return this.http.patch(`${environment.datababe_url}/canchas/${cancha.id}`, cancha);
  }

}
