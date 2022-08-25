import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from 'app/interfaces/comentario';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    private http: HttpClient
  ) { }

  list(canchaId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${environment.datababe_url}/comentarios/cancha/${canchaId}`);
  }

  /*
  get(id: string): Observable<Comentario> {
    return this.http.get<Comentario>(`${environment.datababe_url}/comentarios/${id}`);
  }
  */

  delete(id: string): Observable<Comentario> {
    return this.http.delete<Comentario>(`${environment.datababe_url}/comentarios/${id}`);
  }

  add(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${environment.datababe_url}/comentarios/add`, comentario);
  }

  update(comentario: Comentario) {
    return this.http.patch(`${environment.datababe_url}/canchas/${comentario.id}`, comentario);
  }
  
}
