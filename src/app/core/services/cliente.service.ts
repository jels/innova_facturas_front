import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private api: string = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient) {}

  getCliente(id: number): Observable<any> {
    return this.http.get<any>(this.api + 'cliente/' + id);
  }

  getAllClientes(): Observable<any> {
    return this.http.get<any>(this.api + 'clientes');
  }
}
