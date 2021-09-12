import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + this.authService.getToken()
      ),
    });
    return next.handle(authRequest).pipe(catchError((err)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.authService.logout();
        }
      }
      return EMPTY;
    }));
  }
}
