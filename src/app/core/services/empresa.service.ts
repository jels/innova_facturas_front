import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private api: string = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient) {}

  getEmpresa(id: number): Observable<any> {
    return this.http.get<any>(this.api + 'empresa/' + id);
  }
}
