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

  getFactura(id: number): Observable<any> {
    return this.http.get<any>(this.api + 'factura/' + id);
  }

  setFactura(factura: Factura): Observable<any> {
    return this.http.post<any>(this.api + 'factura', factura);
  }

  updatedFactura(factura: Factura, id: number): Observable<any> {
    console.log('la factura es la siguiente...', factura, id);
    return this.http.put<any>(this.api + 'factura/' + id, factura);
  }

  getFacturasFiltradas(anho: number, mes: number, id: number): Observable<any> {
    return this.http.get<any>(
      this.api + 'facturas/' + id + '&' + anho + '&' + mes
    );
  }
}
