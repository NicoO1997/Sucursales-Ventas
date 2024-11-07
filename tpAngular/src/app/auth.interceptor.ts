import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          const authReq = request.clone({
            headers: request.headers
              .set('Authorization', `Bearer ${user.uid}`)
              .set('Role', user.role)
          });
          return next.handle(authReq);
        }
        return next.handle(request);
      })
    );
  }
}