import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RgfacturaService {
  private api: string = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient) {}

  getRgFactura(id: number): Observable<any> {
    return this.http.get<any>(this.api + 'rgfactura/' + id);
  }

  getAllRgFacturas(): Observable<any> {
    return this.http.get<any>(this.api + 'rgfacturas');
  }

  showAllORderASC(): Observable<any> {
    return this.http.get<any>(this.api + 'rgfacturasasc');
  }

  findAllByRuc(ruc: number): Observable<any> {
    return this.http.get<any>(this.api + 'rgfacturaruc/' + ruc);
  }

  listRg90(): Observable<any> {
    return this.http.get<any>(this.api + 'listrgfacturas');
  }
}
