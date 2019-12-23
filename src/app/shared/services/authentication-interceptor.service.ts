import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationService.currentUserChangedEvent
      .pipe(
        // take(1): This will get the last value emitted and the unsubscribe automatically
        take(1),
        // exhaustMap: Gets the user retrieved by take(1) and also replaces the returned Observable
        // (initally CurrentUserChanged observable would've been returned, but now the HttpEvent observable is)
        exhaustMap((user: User) => {
          let clonedRequest = request;

          if (user && user.token) {
            clonedRequest = request.clone({
              params: request.params.append("auth", user.token)
            });
          }

          return next.handle(clonedRequest);
        })
      )
  }
}
