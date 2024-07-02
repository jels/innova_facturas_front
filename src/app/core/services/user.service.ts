import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUser: string = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUser + 'users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUser + 'user/' + id);
  }
}
