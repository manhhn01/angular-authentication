import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiHost = 'https://api.mn07.xyz/angular-auth';
  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsername(): Observable<any> {
    return this.http.get<any>(this.apiHost + '/user');
  }
}
