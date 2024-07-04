import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../model/Factura';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private api: string = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient) {}

  getAllFacturas(): Observable<any> {
    return this.http.get<any>(this.api + 'facturas');
  }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(this.api + 'factura/' + id);
  }

  setFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.api + 'factura', factura);
  }
}
