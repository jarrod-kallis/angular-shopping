import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user.model';
import { AppState } from '../../store/app.reducer';
import { State } from '../../authentication/store/authentication.reducer';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private store: Store<AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return this.authenticationService.currentUserChangedEvent
    return this.store.select('authentication')
      .pipe(
        // take(1): This will get the last value emitted and the unsubscribe automatically
        take(1),
        // When using the Redux store we need to map the whole auth state just to return the user object
        map((authenticationState: State) => authenticationState.user),
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
