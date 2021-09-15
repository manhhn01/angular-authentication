import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationsService } from '../notifications/notifications.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiHost = 'https://api.mn07.xyz/angular-auth';
  private isAuth: boolean = false;
  private token: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  login(username: string, password: string): any {
    var data = { username: username, password: password };
    this.http.post<any>(this.apiHost + '/login', data).subscribe(
      (response) => {
        if (response.success) {
          this.token = response.token;
          this.isAuth = true;
          this.saveToken(response.token);
          this.notificationsService.addNotification('Success! Redirecting...');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        } else {
          this.notificationsService.addNotification(response.message);
        }
      },
      (err) => {
        this.notificationsService.addNotification('Unknown Error');
      }
    );
  }

  signup(username: string, password: string): void {
    var data = { username: username, password: password };
    this.http.post<any>(this.apiHost + '/signup', data).subscribe(
      (response) => {
        if (response.success) {
          this.notificationsService.addNotification('Success! Redirecting...');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.notificationsService.addNotification(response.message);
        }
      },
      (err) => {
        this.notificationsService.addNotification('Unknown Error');
      }
    );
  }

  logout() {
    this.token = '';
    this.isAuth = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log('User logged out');
  }

  getIsAuth(): boolean {
    return this.isAuth;
  }

  getToken(): string {
    return this.token;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  loadToken(): { token: string } | undefined {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    } else {
      this.token = token;
      this.isAuth = true;
      return {
        token: token,
      };
    }
  }
}
