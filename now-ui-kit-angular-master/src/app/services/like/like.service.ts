import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from 'app/interfaces/like';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private http: HttpClient
  ) { }

  list(canchaId: string): Observable<Like[]> {
    return this.http.get<Like[]>(`${environment.datababe_url}/likes/cancha/${canchaId}`);
  }

  /*
  get(id: string): Observable<Like> {
    return this.http.get<Like>(`${environment.datababe_url}/likes/${id}`);
  }
  */

  delete(id: string): Observable<Like> {
    return this.http.delete<Like>(`${environment.datababe_url}/likes/${id}`);
  }

  add(like: Like): Observable<Like> {
    return this.http.post<Like>(`${environment.datababe_url}/likes/add`, like);
  }
  
}
