import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

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

  newCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.api + 'cliente', cliente);
  }

  updateCliente(cliente: Cliente, id: number): Observable<any> {
    return this.http.put<any>(this.api + 'cliente/' + id, cliente);
  }
}
