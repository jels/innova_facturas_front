import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../model/Rol';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private api: string = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any> {
    return this.http.get<any>(this.api + 'roles');
  }

  getRol(id: number): Observable<Rol> {
    return this.http.get<Rol>(this.api + 'rol/' + id);
  }
}
